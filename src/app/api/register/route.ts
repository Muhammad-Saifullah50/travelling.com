import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const POST = async (request: NextRequest) => {
    const body = await request.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
        return NextResponse.json("Missing Fields", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    });

    console.log(newUser)


}