// lib/email.ts
import nodemailer from 'nodemailer';
async function sendMail(email:string,college:string,message:string){
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
    subject: "Hi Bro", 
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #4a90e2;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      color: #333;
    }
    .content h2 {
      font-size: 20px;
      margin: 0 0 10px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      margin: 0 0 20px;
    }
    .footer {
      background-color: #f4f4f9;
      text-align: center;
      padding: 10px;
      font-size: 14px;
      color: #777;
    }
    .footer a {
      color: #4a90e2;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>College Announcement</h1>
    </div>
    <div class="content">
      <h2>Important Message</h2>
      <h3>${college}</h3>
      <p>Dear Student,</p>
      <p>
        We would like to inform you of the following message that has been shared by the college administration:
      </p>
      <blockquote style="font-style: italic; margin: 20px 0; padding: 10px; background-color: #f9f9f9; border-left: 4px solid #4a90e2;">
      ${message} 
      </blockquote>
      <p>
        For more details, visit the college website or contact the administrative office.
      </p>
      <p>Thank you,<br>College Administration</p>
    </div>
    <div class="footer">
      <p>
        This is an automated email. Please do not reply. For support, contact us at 
        <a href="mailto:support@college.edu">support@college.edu</a>.
      </p>
    </div>
  </div>
</body>
</html>


    `, // html body
  });

  console.log("Message sent: %s", info.messageId);

}
export {sendMail}