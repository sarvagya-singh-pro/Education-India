import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/prisma'
import { NextResponse } from 'next/server'


export  async function POST(req: NextApiRequest) {
    const id=(await req.json()).id
    const user=await prisma.user.findUnique({
        where:{
            id:id
        }
    })

    return NextResponse.json({"user":user})    
  
}