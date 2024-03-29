import jwt from "jsonwebtoken"
import prisma from "@/app/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request){
    
    const reqBody = await request.json()
    const {tokenGiven}   = reqBody
    const token = request.cookies.get('token')["value"];
    console.log(request.cookies.get('token')["value"])
    const decodedToken= jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decodedToken.id)
    const user=prisma.user.findUnique(
        {
            where:{
                id:decodedToken.id,
            }
        }
    )
    if(user.verifyTokenString==tokenGiven){
       prisma.user.update({
        data:{
            verified: true,
        }
       })
    }
    else{
        console.log("not ok")
    }
    
    return NextResponse.json({"ok":200})

    

}