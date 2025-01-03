import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import prisma from '../../../../prisma/prisma'

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try{
    const formData=await req.json()
    console.log(new Date(formData.dob))
    const user=await prisma.user.update({
        where:{
            id:formData.id
        },
        data:{
            phoneNumber:formData.mobile,
            aadharNo:formData.aadharNo,
            category:formData.category,
            course:formData.course,
            dob:new Date(formData.dob),
            idMark:formData.idMark,
            motherName:formData.motherName,
            fatherName:formData.fatherName,
            bloodGroup:formData.bloodGroup,
            maritalStatus:formData.maritalStatus,
            session:formData.session,
            university:formData.university,
            profileCompleted:true,

            

            

        }
    })
    
    return NextResponse.json({"sucess":200},{status:200})
}
catch(e:any){
    console.log(e.message)
}
  
}