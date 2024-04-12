import { NextResponse } from "next/server";
import prisma from "../../../../../utils/prisma";
import { hash } from "bcrypt"
import * as z from "zod"

const userSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(1, 'Password is required')
        .min(3, 'Password must have than 8 characters')
})

export async function POST(request, context) {
    try {
        const data = await request.json();
        const { name, email, password } = userSchema.parse(data)

        // check if user email already exist
        const existEmail = await prisma.user.findUnique({
            where: { email: email }
        })

        if (existEmail) {
            return NextResponse.json({user: null, message: "Email already exist", error: true})
        }

        // Hash password
        const hashPassword = await hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
            },
        });

        return NextResponse.json({ user: newUser, message: "User created" });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong!", error: error})
    }
}
