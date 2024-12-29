// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import crypto from "crypto"
import prisma from '../../../../prisma/prisma'; // Adjust the path to your prisma client
import {sendMail} from '../../../../components/email'
const saltRounds = 10;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    // Create a new user
    let now = new Date();

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    let token=crypto.randomBytes(32).toString('hex');
    console.log(token)
    const verification=await prisma.verificationToken.create({
      data:{
        token:token,
        expires:new Date(now.getTime() + 60 * 60 * 1000),
        user:{ connect: { id: newUser.id } }

        
      }

    })
 await sendMail("singhsarvagya260508@gmail.com",token)
 console.log('ran')
    return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user', error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'GET method is not allowed here' }, { status: 405 });
}

