import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import { NextRequest } from "next/server";
const crypto = require('crypto');
import { PrismaClient } from '@prisma/client';
export const sendEmail = async({email, emailType, userId}) => {
    const prisma = new PrismaClient()
    try {
        // create a hased token
        const hashedToken = crypto.randomInt(100000, 999999);
        

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
            await prisma.user.update({
                where: {
                  id: userId
                },
                data: {
                    forgotPasswordExpiration:new Date(new Date() + 3600000),
                    forgotPasswordString:hashedToken.toString(),
                }
              });
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
            html: `token=${hashedToken} `
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error) {
        throw new Error(error.message);
    }
}