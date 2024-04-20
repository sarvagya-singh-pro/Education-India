import { NextRequest, NextResponse } from "next/server";
import bcryptjs, { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/app/database/prisma";
export async function POST(request) {
    try {

        const reqBody = await request.json()
        const { phone, password } = reqBody
        console.log(phone)
        const user = await prisma.user.findUnique({
            where: {
                phone:phone,
            },
        })
        if (!user) {
            console.log("User does not exist")
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
            
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
                console.log("password galat hai")
                return NextResponse.json({ "Wrong Password": "Bad Request" }, { status: 400 })
            }
        }
        console.log(reqBody)
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ "internal Server Error": err }, { status: 500 })
        
    }

}
