import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'
import { PrismaClient } from '@prisma/client';
export const sendEmail = async({email, emailType, userId}) => {
    const prisma = new PrismaClient()
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "verify") {
            await prisma.user.update({
                where: {
                  id: userId
                },
                data: {
                    verifyTokenExpiration:new Date(new Date() + 3600000),
                    verifyTokenString:hashedToken.toString(),
                }
              });
          
        } else if (emailType === "ForgotPassword"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD
            }
          });


        const mailOptions = {
            from: 'singhsarvagya260508@example.com',
            to: 'singhsarvagya260508@gmail.com',
            subject: emailType === "verify" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "Verify" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error) {
        throw new Error(error.message);
    }
}