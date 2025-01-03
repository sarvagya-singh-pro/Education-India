import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import crypto from "crypto"
import prisma from '../../../../prisma/prisma'
import bcrypt from 'bcrypt'
import { cache } from 'react'
export async function POST(req: NextApiRequest) {
  try{
    let {phoneNumber,id}= await req.json()
     console.log(phoneNumber)
    let token:string =crypto.randomInt(1000,9999).toString()
    console.log(id)
    console.log(token)
    const user=await prisma.user.findUnique({
        where:{id:id}
    })

    console.log(user)
    let now=new Date()
    console.log(now.getTime())
    console.log(new Date(now.getTime() + 60 * 60 * 1000))
 
    const verification=await prisma.verificationToken.create({
        data:{
          token:token,
          expires:new Date(now.getTime() + 60 * 60 * 1000),
          user:{ connect: { id: user.id } }
  
          
        }
  
      })
      console.log(verification)
    // let response = await fetch(`https://www.fast2sms.com/dev/bulkV2?
    //     \
    //     authorization=${process.env.SMS_SECRET}\
    //     &route=otp&variables_values=${token}&flash=0&numbers=${phoneNumber}&schedule_time=`)
    return NextResponse.json({"success":200},{status:200})
  }
  catch(e){
    console.log(e.message)
    return NextResponse.json({"ok":200})
  }
}