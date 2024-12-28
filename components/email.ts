// lib/email.ts
import jwt from "jsonwebtoken"
import nodemailer from 'nodemailer';
async function sendMail(email:string,token:any){
let testAccount = await nodemailer.createTestAccount();
  console.log("Thodere din me dekhegi")

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:'gmail',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'singhsarvagya260508@gmail.com', // generated ethereal user
      pass: process.env.EMAIL_VERIFICATION, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'singhsarvagya260508@gmail.com', 
    to: email,
    subject: "Elements in paris", 
    html: `<!DOCTYPE html>
<html>
<head>
  <style>
    /* General styles for better compatibility */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 8px;
      overflow: hidden;
    }
    .header {
      background-color: #4caf50;
      color: white;
      text-align: center;
      padding: 15px 20px;
    }
    .content {
      padding: 20px;
      color: #333333;
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      margin: 20px 0;
      padding: 10px 20px;
      background-color: #4caf50;
      color: white;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      background-color: #f1f1f1;
      text-align: center;
      font-size: 12px;
      color: #777777;
      padding: 15px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Welcome to Education India!</h1>
    </div>
    <div class="content">
      <p>Hi ,</p>
      <p>Thank you for signing up with us! Please verify your email address to complete your signup process. Simply click the button below:</p>
      <p>
        <a href="http://localhost:3000/verify?token=${token}" class="button">Verify Email</a>
      </p>
      <p>If you didn't request this email, please ignore it.</p>
      <p>Best regards,</p>
      <p>The [Your Company Name] Team</p>
    </div>
    <div class="footer">
      &copy; 2024 [Your Company Name]. All rights reserved.<br>
      If you have questions, contact us at <a href="mailto:support@yourcompany.com">support@yourcompany.com</a>
    </div>
  </div>
</body>
</html>

    `, // html body
  });

  console.log("Message sent: %s", info.messageId);

}
export {sendMail}