import jwt from "jsonwebtoken"
import prisma from "@/app/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request){
    
    const reqBody = await request.json()
    const {type,tokenGiven,email}   = reqBody
   

    if(type=="forgot"){
        const user=await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        console.log(user.forgotPasswordString)
        console.log(reqBody.tokenGiven)
        if(user.forgotPasswordString==tokenGiven){
            const tokenData = {
                id: user.id,
                name: user.name,
                email: user.email
            }   
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "14d"})
        const response=NextResponse.json({
            message: "Valid User",
            success: true,
        });
        response.cookies.set("token", token, {
            httpOnly: true, 
            
        })
        return response
        }
        else{
            
            return NextResponse.json({message:'not ok'},{success:false})
        }

    }
    else{
        const user=prisma.user.findUnique(
            {
                where:{
                    id:decodedToken.id,
                }
            }
        )
        const token = request.cookies.get('token')["value"];
        console.log(request.cookies.get('token')["value"])
        const decodedToken= jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(decodedToken.id)
    if(user.verifyTokenString==tokenGiven){
      await prisma.user.update({
        where:{
            id:decodedToken.id,
        },
        data:{
            verified: true,
        }
       })
       return NextResponse.json({success:"400"})

    }
    else{
        return NextResponse.json({"user not found":405},{status:405})
    }
    
}
   

    

}