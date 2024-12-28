import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function  GET(email:string) 
{

  let user=await prisma.user.findUnique({
    where:{
      email:email
    }
  })
  if(user && user.profileCompleted){
    return NextResponse.json({"200":"ok"},{status:200})
  }
  else{
    return NextResponse.json({"no":"profile complete"},{status:400})
  }

  
}
export async function POST(req: Request) {
  const { phoneNumber, userId } = await req.json();

  await prisma.user.update({
    where: { id: userId },
    data: { phoneNumber, profileCompleted: true },
  });

  return NextResponse.json({ message: "Profile updated" });
}
