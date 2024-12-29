import prisma from '@/lib/prisma';
import authStatus from '@/lib/auth-status';
import { NextRequest, NextResponse } from "next/server";
import { uploadCV, deleteCV } from '@/lib/cloudinary';

export async function PATCH(request: NextRequest) {
  try {
    const { currentUser } = await authStatus();
    const formData = await request.formData();
    
    const cvFile = formData.get('cv') as File | null;
    const data = JSON.parse(formData.get('data') as string);

    let cvUrl: string | undefined;
    
    if (cvFile) {
      // Convert File to Buffer
      const bytes = await cvFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Delete existing CV if it exists
      await deleteCV(currentUser.id);
      
      // Upload new CV
      cvUrl = await uploadCV(buffer, currentUser.id);
    }

    const studentDetailsExists = await prisma.studentDetails.findUnique({
      where: { studentId: currentUser.id },
    });

    if (studentDetailsExists) {
      const studentDetails = await prisma.studentDetails.update({
        where: { studentId: studentDetailsExists.studentId },
        data: {
          ...data,
          ...(cvUrl && { cv: cvUrl }),
        },
      });
      return NextResponse.json(studentDetails, { status: 200 });
    }

    const studentDetails = await prisma.studentDetails.create({
      data: {
        ...data,
        ...(cvUrl && { cv: cvUrl }),
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
    
    return NextResponse.json(studentDetails, { status: 200 });
  } catch (error) {
    console.error('Error updating student details:', error);
    return NextResponse.json(
      { error: 'Failed to update student details' },
      { status: 500 }
    );
  }
}
