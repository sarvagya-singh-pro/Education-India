import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import {sendEmail} from '@/helper/mailer'
import jwt from "jsonwebtoken";
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
<<<<<<< HEAD
       })
       if(!user){
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        
        const user=await prisma.user.create({
            data:{
            
            email:email,
            name:name,
            password:hashedPassword
            }
            
            
        })
        const tokenData = {
            id: user.id,
            name: user.name,
            email: user.email
        }   
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "14d"})
        
        const response=NextResponse.json({
            message: "Sign Up successful",
            success: true,
        });
         response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        await sendEmail({email,emailType:'verify',userId:user.id})
                
        return response
=======
        })
        if (!user) {
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt)
>>>>>>> 72a264ea9d4fc2106244733979788771d590543e

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