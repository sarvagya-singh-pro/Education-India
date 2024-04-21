import prisma from "@/app/database/prisma"
import { sendEmail } from "@/helper/mailer"
import axios from "axios"
const crypto = require('crypto')
import { NextRequest, NextResponse } from "next/server"
export  async function POST(req)  {
    const reqBody = await req.json()
    const {phone,type,otp}   = reqBody
   
    const user=await prisma.user.findUnique({
        where:{
        phone:phone       
     }
    })
    if(user){
        console.log(otp)
   if (type=="phone"){
    console.log(user.phone)
   const hashedToken = crypto.randomInt(100000, 999999);
   await prisma.user.update(
    {
        where:{
            id:user.id,
        },
        data:{
            forgotPasswordString:hashedToken.toString()
        }
    }
   )
   await axios.get(`https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.SMS_API_KEY}&route=otp&variables_values=${hashedToken}&flash=0&numbers=${user.phone}`).then(()=>{console.log("hello")}).catch(err=>{console.error(err)})
}
else{
    console.log("no message for you")
}
   return NextResponse.json({"message":"ok 200"},{success:true})
}
    else{
       
        return NextResponse.json({"message":'User Not found'},{success:false})
    }
    

    
   
}