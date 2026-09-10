import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(req: Request, { params }: { params: { journeyId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { journeyId } = params;

    const journey = await db.journey.findFirst({
      where: {
        id: journeyId,
        ownerUserId: session.user.id,
      },
      include: {
        gunaStates: {
          include: { guna: true },
        },
        reflections: {
          orderBy: { createdAt: 'desc' },
          include: { analyses: true },
        },
        concernFlags: {
          orderBy: { createdAt: 'desc' },
        },
        perspectives: true,
      },
    });

    if (!journey) {
      return NextResponse.json({ error: 'Journey not found or unauthorized' }, { status: 404 });
    }

    const formattedJourney = {
      ...journey,
      personName: journey.partnerDisplayName,
    };

    return NextResponse.json({ journey: formattedJourney });
  } catch (error) {
    console.error(`Failed to fetch journey ${params.journeyId}:`, error);
    return NextResponse.json({ error: 'Failed to fetch journey' }, { status: 500 });
  }
}
