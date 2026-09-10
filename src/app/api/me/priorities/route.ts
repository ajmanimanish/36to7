import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { Importance } from '@prisma/client';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const priorities = await db.userGunaPriority.findMany({
      where: { userId: session.user.id },
      include: { guna: true },
    });

    // Map by guna number (1-36) or gunaId
    const priorityMap: Record<number, Importance> = {};
    priorities.forEach((p) => {
      priorityMap[p.guna.number] = p.importance;
    });

    return NextResponse.json({ priorities, priorityMap });
  } catch (error) {
    console.error('Failed to fetch priorities:', error);
    return NextResponse.json({ error: 'Failed to fetch priorities' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { gunaNumber, importance } = body;

    if (typeof gunaNumber !== 'number' || !importance || !Object.values(Importance).includes(importance)) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    // Find Guna ID by number
    const guna = await db.guna.findFirst({
      where: { number: gunaNumber },
    });

    if (!guna) {
      return NextResponse.json({ error: 'Guna not found' }, { status: 404 });
    }

    const priority = await db.userGunaPriority.upsert({
      where: {
        userId_gunaId: {
          userId: session.user.id,
          gunaId: guna.id,
        },
      },
      update: {
        importance,
      },
      create: {
        userId: session.user.id,
        gunaId: guna.id,
        importance,
      },
    });

    // Update onboarding state if not already set
    await db.user.update({
      where: { id: session.user.id },
      data: { onboardingState: 'PRIORITIES_SET' },
    });

    return NextResponse.json({ success: true, priority });
  } catch (error) {
    console.error('Failed to update priority:', error);
    return NextResponse.json({ error: 'Failed to update priority' }, { status: 500 });
  }
}
