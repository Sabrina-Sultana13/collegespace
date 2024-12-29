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

    // Normalize the data structure
    const normalizedData = {
      ...data,
      // If skills exist in data, store them as a string
      ...(data.skills && { skills: data.skills.join(',') }),
    };

    let cvUrl: string | undefined;
    
    if (cvFile) {
      const bytes = await cvFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await deleteCV(currentUser.id);
      cvUrl = await uploadCV(buffer, currentUser.id);
    }

    const studentDetailsExists = await prisma.studentDetails.findUnique({
      where: { studentId: currentUser.id },
    });

    if (studentDetailsExists) {
      const studentDetails = await prisma.studentDetails.update({
        where: { studentId: currentUser.id },
        data: {
          ...normalizedData,
          ...(cvUrl && { cv: cvUrl }),
        },
      });
      return NextResponse.json(studentDetails, { status: 200 });
    }

    const studentDetails = await prisma.studentDetails.create({
      data: {
        ...normalizedData,
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
