import { NextRequest, NextResponse } from "next/server";
import bcryptjs, { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export async function POST(request) {
    try {

        const reqBody = await request.json()
        const { email, password } = reqBody
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
            console.log("User does not exist")
        }
        else {
            const validPassword = await bcryptjs.compare(password, user.password)
            if (validPassword) {
                const tokenData = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
                const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "14d" })
                console.log(token)
                const response = NextResponse.json({
                    message: "Login successful",
                    success: true,
                });
                response.cookies.set("token", token, {
                    httpOnly: true,

                })
                return response
            }
            else {
                return NextResponse.json({ "Wrong Password": "Bad Request" }, { status: 400 })
            }
        }
        console.log(reqBody)
    }
    catch (err) {
        return NextResponse.json({ "internal Server Error": err }, { status: 500 })
        console.log(err)
    }

}
