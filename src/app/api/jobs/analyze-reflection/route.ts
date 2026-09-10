import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { processReflectionAnalysis } from '@/lib/ai/llm-client';

// POST: Direct job worker for a single reflectionId
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { reflectionId } = body;

    if (!reflectionId || typeof reflectionId !== 'string') {
      return NextResponse.json({ error: 'Missing reflectionId parameter' }, { status: 400 });
    }

    // Check if reflection exists and hasn't been analyzed yet
    const reflection = await db.reflection.findUnique({
      where: { id: reflectionId },
      include: { analyses: true },
    });

    if (!reflection) {
      return NextResponse.json({ error: 'Reflection not found' }, { status: 404 });
    }

    if (reflection.analyses.length > 0) {
      return NextResponse.json({ message: 'Reflection already analyzed', reflectionId });
    }

    await processReflectionAnalysis(reflection.id);

    return NextResponse.json({ success: true, reflectionId });
  } catch (error) {
    console.error(`Job worker execution error for reflection analysis:`, error);
    return NextResponse.json({ error: 'Analysis job failed' }, { status: 500 });
  }
}

// GET: Durable Cron / Sweep worker for unanalyzed reflections
export async function GET() {
  try {
    // Find all reflections that do not have an analysis entry yet
    const unanalyzedReflections = await db.reflection.findMany({
      where: {
        analyses: {
          none: {},
        },
      },
      take: 10,
    });

    const processedIds: string[] = [];

    for (const ref of unanalyzedReflections) {
      await processReflectionAnalysis(ref.id);
      processedIds.push(ref.id);
    }

    return NextResponse.json({
      success: true,
      sweptCount: processedIds.length,
      processedIds,
    });
  } catch (error) {
    console.error('Cron sweep execution error:', error);
    return NextResponse.json({ error: 'Cron sweep failed' }, { status: 500 });
  }
}
