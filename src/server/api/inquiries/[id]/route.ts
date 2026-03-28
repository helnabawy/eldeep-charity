import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {


    const data = await request.json();
    const inquiry = await prisma.inquiry.update({
      where: { id: params.id },
      data: {
        isRead: data.isRead,
        reply: data.reply,
      },
    });
    return NextResponse.json(inquiry);
   } catch {
    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}
