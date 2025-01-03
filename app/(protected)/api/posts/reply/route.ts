import authStatus from '@/lib/auth-status';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { currentUser } = await authStatus();
  const body = await request.json();

  await prisma.reply.create({
    data: {
      content: body.content,
      userId: currentUser.id,
      postId: body.id,
    },
  });

  const postOwnerId = await prisma.post.findUnique({
    where: {
      id: body.id,
    },
    select: {
      userId: true,
    },
  });

  if (postOwnerId?.userId !== currentUser.id) {
    await prisma.notification.create({
      data: {
        userId: postOwnerId!.userId,
        content: `${currentUser.name} commented your post`,
      },
    });
  }

  return NextResponse.json({}, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  await prisma.reply.delete({
    where: {
      id: body.id,
    },
  });

  return NextResponse.json({}, { status: 200 });
}
