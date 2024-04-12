import { NextResponse } from 'next/server';
import prisma from "../../../../utils/prisma";

export async function GET() {
    return NextResponse.json({message: "hello"})
}

export async function POST(request, context){

    const data = await request.json()
    const { title, content, courseId, order } = data

    //check missing fields
    if(!title || !content || !courseId || !order){
        return NextResponse.json({message: "Please fill all fields", error: true})
    }

    const lesson = await prisma.lesson.create({
        data: {
            title,
            content,
            courseId,
            order
        }
    })


    return NextResponse.json({ data: lesson, message: "Lesson created !" });
}