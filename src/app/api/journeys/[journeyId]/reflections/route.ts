import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { processReflectionAnalysis } from '@/lib/ai/llm-client';

export async function POST(req: Request, { params }: { params: { journeyId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { journeyId } = params;
    const body = await req.json();
    const { content } = body;

    if (!content || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json({ error: 'Reflection content cannot be empty.' }, { status: 400 });
    }

    // Verify journey ownership
    const journey = await db.journey.findFirst({
      where: { id: journeyId, ownerUserId: session.user.id },
    });

    if (!journey) {
      return NextResponse.json({ error: 'Journey not found or unauthorized.' }, { status: 404 });
    }

    // 1. Create reflection in DB immediately
    const reflection = await db.reflection.create({
      data: {
        journeyId,
        authorUserId: session.user.id,
        body: content.trim(),
      },
    });

    // 2. Trigger job via internal fetch / job endpoint execution
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https';
    const jobUrl = `${protocol}://${host}/api/jobs/analyze-reflection`;

    // Dispatch HTTP job request to /api/jobs/analyze-reflection
    fetch(jobUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reflectionId: reflection.id }),
    }).catch((err) => {
      console.warn(`Internal job trigger fetch warning (cron sweep fallback will handle):`, err);
      // Fallback direct execution if fetch fails locally
      processReflectionAnalysis(reflection.id).catch((e) => console.error(e));
    });

    return NextResponse.json({ success: true, reflection });
  } catch (error) {
    console.error('Failed to create reflection:', error);
    return NextResponse.json({ error: 'Failed to save reflection' }, { status: 500 });
  }
}
