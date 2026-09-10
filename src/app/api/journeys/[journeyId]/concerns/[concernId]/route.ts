import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { ConcernStatus } from '@prisma/client';

export async function PATCH(
  req: Request,
  { params }: { params: { journeyId: string; concernId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { journeyId, concernId } = params;
    const body = await req.json();
    const { status } = body;

    if (!status || !Object.values(ConcernStatus).includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    // Verify journey ownership
    const journey = await db.journey.findFirst({
      where: { id: journeyId, ownerUserId: session.user.id },
    });

    if (!journey) {
      return NextResponse.json({ error: 'Journey not found or unauthorized.' }, { status: 404 });
    }

    const updatedConcern = await db.concernFlag.update({
      where: { id: concernId },
      data: { status: status as ConcernStatus },
    });

    return NextResponse.json({ success: true, concern: updatedConcern });
  } catch (error) {
    console.error('Failed to update concern status:', error);
    return NextResponse.json({ error: 'Failed to update concern status' }, { status: 500 });
  }
}
