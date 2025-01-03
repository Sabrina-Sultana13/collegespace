import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { name, username, email, phone, password, role } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  } else {
    await prisma.user.create({
      data: {
        name,
        username,
        email,
        phone,
        password: await bcrypt.hash(password, 10),
        role,
      },
    });
    return NextResponse.json({ status: 201 });
  }
}
