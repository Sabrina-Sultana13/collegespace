import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  await prisma.education.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({}, { status: 200 });
}
