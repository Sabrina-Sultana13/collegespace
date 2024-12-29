import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const company = await prisma.company.findUnique({
    where: { id: id },
  });

  return NextResponse.json(company, { status: 200 });
}
