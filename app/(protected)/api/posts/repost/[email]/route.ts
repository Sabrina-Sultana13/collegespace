import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, props: { params: Promise<{ email: string }> }) {
  const params = await props.params;
  const data = await prisma.user.findUnique({
    where: { email: params.email },
    select: {
      reposts: {
        select: {
          post: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              userId: true,
              user: {
                select: {
                  name: true,
                  email: true,
                  image: true,
                },
              },
              _count: { select: { likes: true, replies: true, reposts: true } },
            },
          },
        },
      },
    },
  });

  if (!data)
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });

  return NextResponse.json(data.reposts, { status: 200 });
}
