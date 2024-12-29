import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 1;

export async function GET(request: NextRequest, props: { params: Promise<{ jobId: string }> }) {
  const params = await props.params;
  const { jobId } = params;
  const jobs = await prisma.job.findUnique({
    where: { id: jobId },
    select: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });
  return NextResponse.json(jobs?.user, { status: 200 });
}
