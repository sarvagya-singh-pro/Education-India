
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
export const getUserData = async (token)=>{
    
    const prisma=new PrismaClient()
    
    const  id=jwt.decode(token).id;
    const user=await prisma.user.findUnique({
        where:{
            id:id
        }
    })
    console.log(user)
    
    return user;
}