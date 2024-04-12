import { NextResponse } from "next/server";
import prisma from "../../../../../utils/prisma";


export async function POST(request) {
  const data = await request.json();
    const { email, password } = data;
    
    // check if user exists
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if(!user) {
        return NextResponse.json({ error: "Email or password is incorrect" });
    }

    // check if password is correct
    if(user.password !== password) {
        return NextResponse.json({ error: "Email or password is incorrect" });
    }

    return NextResponse.json({
        user,
    });
}
