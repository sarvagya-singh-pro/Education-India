import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import crypto from "crypto"
import prisma from '../../../prisma/prisma'
export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try{
    let {phone,code,id}=await req.json()
    console.log(phone,code,id)
    let user=await prisma.user.findUnique({
        where:{id:id}
    })
    console.log(user)
    let token=await prisma.verificationToken.findUnique({

        where:{
            token:code
        },
        include:{user:true}
    })
    if(token?.user.id==user?.id){
        console.log("correct token ")

    return NextResponse.json({"success":200},{status:200})
    }
    else{
        return NextResponse.json({"nosuccess":200},{status:200})

    }
}
catch(e){
    console.log(e.message)
}
}