import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { JourneyStage } from '@prisma/client';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const journeys = await db.journey.findMany({
      where: { ownerUserId: session.user.id },
      include: {
        gunaStates: {
          include: { guna: true },
        },
        reflections: {
          orderBy: { createdAt: 'desc' },
          take: 5,
          include: { analyses: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    const formattedJourneys = journeys.map((j) => ({
      ...j,
      personName: j.partnerDisplayName,
    }));

    return NextResponse.json({
      journeys: formattedJourneys,
      activeJourney: formattedJourneys[0] || null,
    });
  } catch (error) {
    console.error('Failed to fetch journeys:', error);
    return NextResponse.json({ error: 'Failed to fetch journeys' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { personName, stage } = body;

    if (!personName || !stage || !Object.values(JourneyStage).includes(stage)) {
      return NextResponse.json(
        { error: 'Person name and valid documented JourneyStage are required.' },
        { status: 400 }
      );
    }

    const journey = await db.journey.create({
      data: {
        ownerUserId: session.user.id,
        partnerDisplayName: personName.trim(),
        stage: stage as JourneyStage,
      },
    });

    // Update onboarding state
    await db.user.update({
      where: { id: session.user.id },
      data: { onboardingState: 'JOURNEY_CREATED' },
    });

    return NextResponse.json({ success: true, journey });
  } catch (error) {
    console.error('Failed to create journey:', error);
    return NextResponse.json({ error: 'Failed to create journey' }, { status: 500 });
  }
}
