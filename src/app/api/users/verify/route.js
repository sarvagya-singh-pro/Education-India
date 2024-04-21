import jwt from "jsonwebtoken"
import prisma from "@/app/database/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUserData } from "@/helper/cookiedata";

export async function POST(request){
    
    const reqBody = await request.json()
    const {otp}   = reqBody
    console.log(otp)
    const token=request.cookies.get('token').value
    console.log(token)
    const user= await getUserData(token)
    if(user.verifyTokenString==otp){
        await prisma.user.update({
            where:{
              id: user.id,  
            },
            data:{
                verified:true
            }
        })
    return NextResponse.json({ok:200})
    }
    else{
        return NextResponse.json({"Not Correct code":500},{status:405})
    }


   

}
   

    
