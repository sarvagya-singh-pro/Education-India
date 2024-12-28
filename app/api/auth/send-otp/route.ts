import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
  });

  await transporter.sendMail({
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  });

  await prisma.user.update({ where: { email }, data: { password: otp } });

  return NextResponse.json({ message: "OTP sent" });
}
