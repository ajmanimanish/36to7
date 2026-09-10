import Groq from 'groq-sdk';
import { z } from 'zod';
import { db } from '@/lib/db';
import { ConcernSeverity, GunaState } from '@prisma/client';

// Zod Schema for Reflection Analysis output
export const ReflectionAnalysisSchema = z.object({
  detectedGunas: z.array(
    z.object({
      gunaNumber: z.number().min(1).max(36),
      state: z.enum([
        'NOT_EXPLORED',
        'TAKING_SHAPE',
        'UNDERSTOOD',
        'ALIGNED',
        'DIFFERENT_BUT_OKAY',
        'WORTH_DISCUSSING',
        'IMPORTANT_UNRESOLVED',
      ]),
      summaryPoint: z.string(),
    })
  ),
  clearerPoints: z.array(z.string()),
  emergingPoints: z.array(z.string()),
  differences: z.array(z.string()),
  selfDiscoveries: z.array(z.string()),
  areasWorthExploring: z.array(z.string()),
  concerns: z.array(
    z.object({
      text: z.string(),
      severity: z.enum(['EXPLORE', 'IMPORTANT', 'SERIOUS', 'SAFETY']),
      gunaNumber: z.number().optional(),
      category: z.string().optional(),
      suggestedResource: z.string().optional(),
    })
  ),
  isMockAnalysis: z.boolean().optional(),
});

export type ReflectionAnalysisResult = z.infer<typeof ReflectionAnalysisSchema>;

const SYSTEM_PROMPT = `
You are the AI analysis engine for 36to7 — a private relationship-understanding companion for arranged introductions.
Analyze the user's free-form reflection text and extract structured insights.

STRICT ZERO-SCORE & PERSONA CONSTRAINTS:
1. NEVER output a compatibility score, percentage, grade, or pass/fail verdict.
2. NEVER invent partner internal states. Distinguish what the user explicitly stated vs. what the user believes about the partner.
3. NEVER use astrological terms (horoscope, star sign, karma, dosha) or gaudy red-flag labels.
4. Map mentioned topics to Guna numbers (1 to 36) and assign one of the 7 GunaState values:
   - NOT_EXPLORED: Topic not touched upon yet.
   - TAKING_SHAPE: Initial thoughts emerging, curiosity present.
   - UNDERSTOOD: Clear mutual perspective expressed.
   - ALIGNED: Explicit agreement or shared values confirmed.
   - DIFFERENT_BUT_OKAY: Contrast noted, but accepted with ease and mutual respect.
   - WORTH_DISCUSSING: Specific open question or topic to explore in future interactions.
   - IMPORTANT_UNRESOLVED: Serious friction, boundary concern, or unresolved disagreement.
5. Identify concerns with appropriate severity:
   - EXPLORE: Mild ambiguity or question to clarify.
   - IMPORTANT: Substantial value difference or friction.
   - SERIOUS: Repeated pressure, disrespect, or dishonesty.
   - SAFETY: Controlling behavior, threats, physical safety concerns, isolation, or abuse.

Output ONLY valid JSON matching this schema:
{
  "detectedGunas": [
    { "gunaNumber": 1, "state": "ALIGNED", "summaryPoint": "Both share core life values on personal growth." }
  ],
  "clearerPoints": ["Gained clarity on living arrangements..."],
  "emergingPoints": ["Career relocation preferences coming into focus..."],
  "differences": ["Weekend social pace differs..."],
  "selfDiscoveries": ["Realized need for quiet downtime..."],
  "areasWorthExploring": ["How family holidays will be shared..."],
  "concerns": [
    {
      "text": "Felt pressured about timeline...",
      "severity": "IMPORTANT",
      "category": "communication",
      "gunaNumber": 2
    }
  ]
}
`;

export async function analyzeReflectionText(reflectionText: string): Promise<ReflectionAnalysisResult> {
  const apiKey = process.env.GROQ_API_KEY;
  const vercelEnv = process.env.VERCEL_ENV;
  const nodeEnv = process.env.NODE_ENV;

  // Determine if we are in true production mode vs Vercel preview/dev/local
  const isTrueProduction = (vercelEnv === 'production') || (!vercelEnv && nodeEnv === 'production');

  if (!apiKey) {
    // Hard-fail only in true production without key (unless ALLOW_AI_MOCK is explicitly set)
    if (isTrueProduction && process.env.ALLOW_AI_MOCK !== 'true') {
      throw new Error('AI Analysis Error: GROQ_API_KEY is missing in production environment.');
    }

    // In Vercel preview/development, or local dev mode, allow mock fallback for testing
    return buildMockAnalysis(reflectionText);
  }

  // Retry loop: up to 2 attempts per specs.md
  let lastError: any = null;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const groq = new Groq({ apiKey });
      let modelName = 'llama-3.3-70b-versatile';
      let completion;

      try {
        completion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `USER REFLECTION TEXT:\n"${reflectionText}"` },
          ],
          model: modelName,
          response_format: { type: 'json_object' },
        });
      } catch (err: any) {
        const isRateLimit =
          err?.status === 429 ||
          err?.statusCode === 429 ||
          String(err?.message || '').includes('429');

        if (isRateLimit) {
          console.warn(`Groq 429 Rate Limit on ${modelName}, retrying once with fallback model llama-3.1-8b-instant...`);
          modelName = 'llama-3.1-8b-instant';
          completion = await groq.chat.completions.create({
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: `USER REFLECTION TEXT:\n"${reflectionText}"` },
            ],
            model: modelName,
            response_format: { type: 'json_object' },
          });
        } else {
          throw err;
        }
      }

      const responseText = completion.choices[0]?.message?.content || '{}';
      const parsedJson = JSON.parse(responseText);
      const validated = ReflectionAnalysisSchema.parse(parsedJson);

      return {
        ...validated,
        isMockAnalysis: false,
      };
    } catch (err) {
      console.warn(`Groq LLM analysis attempt ${attempt} failed:`, err);
      lastError = err;
    }
  }

  if (isTrueProduction && process.env.ALLOW_AI_MOCK !== 'true') {
    throw lastError || new Error('Groq LLM parsing failed after retries.');
  }

  return buildMockAnalysis(reflectionText);
}

function buildMockAnalysis(text: string): ReflectionAnalysisResult {
  const lower = text.toLowerCase();
  const detectedGunas: ReflectionAnalysisResult['detectedGunas'] = [];
  const concerns: ReflectionAnalysisResult['concerns'] = [];

  if (lower.includes('money') || lower.includes('budget') || lower.includes('account') || lower.includes('finance')) {
    detectedGunas.push({
      gunaNumber: 24,
      state: lower.includes('disagree') ? 'IMPORTANT_UNRESOLVED' : 'WORTH_DISCUSSING',
      summaryPoint: 'Reflected on financial habits and money management.',
    });
  }
  if (lower.includes('live') || lower.includes('city') || lower.includes('house') || lower.includes('home')) {
    detectedGunas.push({
      gunaNumber: 25,
      state: 'TAKING_SHAPE',
      summaryPoint: 'Discussed preferences regarding home location and living arrangements.',
    });
  }
  if (lower.includes('value') || lower.includes('growth') || lower.includes('belief') || lower.includes('purpose')) {
    detectedGunas.push({
      gunaNumber: 1,
      state: 'ALIGNED',
      summaryPoint: 'Found shared direction regarding core life purpose and ethics.',
    });
  }

  if (detectedGunas.length === 0) {
    detectedGunas.push({
      gunaNumber: 12,
      state: 'UNDERSTOOD',
      summaryPoint: 'Noticed clarity in communication style.',
    });
  }

  // Safety trigger check
  if (lower.includes('scared') || lower.includes('threat') || lower.includes('control') || lower.includes('force') || lower.includes('unsafe') || lower.includes('abuse')) {
    concerns.push({
      text: 'Potential safety concern detected regarding boundary violation or pressure in conversation.',
      severity: 'SAFETY',
      category: 'safety',
      suggestedResource: 'Vandrevala Foundation Helpline: +91 9999 666 555',
    });
  } else if (lower.includes('argument') || lower.includes('fight') || lower.includes('disagree') || lower.includes('tension')) {
    concerns.push({
      text: 'Area of friction or disagreement noted during interaction.',
      severity: 'IMPORTANT',
      category: 'communication',
    });
  }

  return {
    detectedGunas,
    clearerPoints: [`Reflected on ${detectedGunas.length} key relationship dimension(s).`],
    emergingPoints: ['Noticed expectations around shared goals and living habits.'],
    differences: ['Different approaches to scheduling and processing feedback.'],
    selfDiscoveries: ['Realized own boundary preferences during conversation.'],
    areasWorthExploring: ['How decisions will be made when perspectives differ.'],
    concerns,
    isMockAnalysis: true,
  };
}

export async function processReflectionAnalysis(reflectionId: string) {
  const reflection = await db.reflection.findUnique({
    where: { id: reflectionId },
    include: { journey: true },
  });

  if (!reflection) return;

  try {
    const analysis = await analyzeReflectionText(reflection.body);

    const frameworkVersion = await db.frameworkVersion.findFirst();
    if (!frameworkVersion) return;

    const detectedGunaNumbers = analysis.detectedGunas.map((g) => g.gunaNumber);

    // Save ReflectionAnalysis with isMockAnalysis flag persisted
    const reflectionAnalysis = await db.reflectionAnalysis.create({
      data: {
        reflectionId: reflection.id,
        frameworkVersionId: frameworkVersion.id,
        summary: analysis.clearerPoints[0] || 'Reflection analysis summary',
        detectedGunaJson: detectedGunaNumbers,
        clearerPointsJson: analysis.clearerPoints,
        emergingPointsJson: analysis.emergingPoints,
        differencesJson: analysis.differences,
        selfDiscoveriesJson: analysis.selfDiscoveries,
        areasWorthExploringJson: analysis.areasWorthExploring,
        concernsJson: analysis.concerns,
        isMockAnalysis: analysis.isMockAnalysis ?? false,
      },
    });

    // Create ConcernFlag rows in DB
    for (const c of analysis.concerns) {
      const severityEnum = c.severity as ConcernSeverity;

      await db.concernFlag.create({
        data: {
          journeyId: reflection.journeyId,
          reflectionId: reflection.id,
          reflectionAnalysisId: reflectionAnalysis.id,
          category: c.category || 'general',
          severity: severityEnum,
          text: c.text,
          status: 'ACTIVE',
        },
      });
    }

    // Upsert JourneyGunaStates across all 7 GunaState values
    for (const item of analysis.detectedGunas) {
      const guna = await db.guna.findFirst({ where: { number: item.gunaNumber } });
      if (guna) {
        const targetState = item.state as GunaState;
        await db.journeyGunaState.upsert({
          where: {
            journeyId_gunaId: {
              journeyId: reflection.journeyId,
              gunaId: guna.id,
            },
          },
          update: {
            state: targetState,
            aiSummary: item.summaryPoint,
            lastReflectedAt: new Date(),
          },
          create: {
            journeyId: reflection.journeyId,
            gunaId: guna.id,
            state: targetState,
            aiSummary: item.summaryPoint,
            lastReflectedAt: new Date(),
          },
        });
      }
    }
  } catch (err) {
    console.error(`Failed to process analysis for reflection ${reflectionId}:`, err);
  }
}
