import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
const prisma = new PrismaClient();

export async function POST(request) {
    try {



        const reqBody = await request.json()
        const { name, email, password } = reqBody
        console.log(reqBody)
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        if (!user) {
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt)

            await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    password: hashedPassword
                }

            })

            return NextResponse.json({ "ok": 200 })

        }
        else {
            return NextResponse.json({ 'error': 'Email already In use' }, { status: 405 })
        }



    }
    catch (err) {
        console.log(err)
        return NextResponse.json(err, { status: 500 });
    }

}
export function GET() {
    return NextResponse.json({ "methode not allowed": 'no' }, { status: 500 })
}