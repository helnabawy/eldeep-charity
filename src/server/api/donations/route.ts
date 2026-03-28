import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {

    const donations = await prisma.donation.findMany({
      include: { project: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(donations);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const donation = await prisma.donation.create({
      data: {
        donorName: data.donorName,
        donorEmail: data.donorEmail,
        donorPhone: data.donorPhone,
        amount: parseFloat(data.amount),
        currency: 'EGP',
        paymentMethod: data.paymentMethod,
        notes: data.notes,
        projectId: data.projectId,
        status: 'PENDING',
      },
    });
    return NextResponse.json(donation);
  } catch {
    return NextResponse.json(
      { error: 'Failed to create donation' },
      { status: 500 }
    );
  }
}
