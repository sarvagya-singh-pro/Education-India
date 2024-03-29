import prisma from "@/app/database/prisma"
import { NextResponse } from "next/server"

export async function GET() {

    const user=prisma.user.findUnique({
        where:{
            
        }
    })
    console.log(user)

    NextResponse.json({"ok":200})


}