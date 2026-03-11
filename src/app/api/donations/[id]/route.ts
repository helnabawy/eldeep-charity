import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const donation = await prisma.donation.update({
      where: { id: params.id },
      data: {
        status: data.status,
      },
    });

    // If confirmed, update project raised amount
    if (data.status === 'CONFIRMED' && donation.projectId) {
      await prisma.project.update({
        where: { id: donation.projectId },
        data: {
          raisedAmount: {
            increment: donation.amount,
          },
        },
      });
    }

    return NextResponse.json(donation);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update donation' },
      { status: 500 }
    );
  }
}
