import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import authStatus from '@/lib/auth-status';

export async function GET(request: NextRequest) {
  const { currentUser } = await authStatus();

  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          user: {
            followers: {
              some: {
                id: currentUser?.id,
              },
            },
          },
        },
        {
          userId: currentUser?.id,
        },
      ],
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          bio: true,
          username: true,
          createdAt: true,
        },
      },
      _count: { select: { likes: true, replies: true, reposts: true } },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(posts, { status: 200 });
}
