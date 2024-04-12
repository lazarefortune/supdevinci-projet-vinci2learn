import { NextResponse } from 'next/server';
import prisma from "../../../../utils/prisma";
export async function GET() {
    const courses = await prisma.course.findMany(
        {
            include: {
                lessons: true,
                teacher: {
                    select: {
                        name: true
                    }
                }
            }
        }
    );
    return NextResponse.json({
        courses
    });
}