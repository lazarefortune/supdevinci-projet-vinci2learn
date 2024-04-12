import { NextResponse } from "next/server";
import prisma from "../../../../../utils/prisma.js";
export async function GET(request, context) {
    const { courseId } = context.params;

    const course = await prisma.course.findUnique({
        where: { id: parseInt(courseId) },
        include: {
            lessons: true ,
            teacher: {
                select: { name: true }
            }
        }
    });

    return NextResponse.json({ course });
}

