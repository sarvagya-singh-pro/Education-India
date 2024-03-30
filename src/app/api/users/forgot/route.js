import prisma from "@/app/database/prisma"
import { sendEmail } from "@/helper/mailer"
import { NextRequest, NextResponse } from "next/server"
export  async function POST(req)  {
    const reqBody = await req.json()
    const {email}   = reqBody
    console.log(email)

    const user=await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    console.log(user)
    if(user){
    await sendEmail({email,emailType:'ForgotPassword',userId:user.id})
    
    return NextResponse.json({"message":"ok 200"},{success:true})
    }
    else{
       return NextResponse.json({"message":'User Not found'},{success:false})
    }
    


}