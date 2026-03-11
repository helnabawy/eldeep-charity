import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [
      totalDonations,
      pendingDonations,
      totalProjects,
      unreadInquiries,
      recentDonations,
      monthlyStats,
    ] = await Promise.all([
      prisma.donation.count(),
      prisma.donation.count({ where: { status: 'PENDING' } }),
      prisma.project.count(),
      prisma.inquiry.count({ where: { isRead: false } }),
      prisma.donation.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { project: true },
      }),
      prisma.donation.groupBy({
        by: ['createdAt'],
        _sum: { amount: true },
        where: {
          status: 'CONFIRMED',
          createdAt: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 12)),
          },
        },
      }),
    ]);

    // Calculate total amount
    const totalAmount = await prisma.donation.aggregate({
      where: { status: 'CONFIRMED' },
      _sum: { amount: true },
    });

    return NextResponse.json({
      totalDonations,
      pendingDonations,
      totalProjects,
      unreadInquiries,
      totalAmount: totalAmount._sum.amount || 0,
      recentDonations,
      monthlyStats,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
