import nodemailer from 'nodemailer';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';


export const sendEmail = async ({email , emailType, userId}:any) => {
    try {
        //create hashed token
        const hashedToken=await bcrypt.hash(userId.toString(), 10);
        if(emailType==='verify'){
        await User.findByIdAndUpdate(userId, {
            verifyToken: hashedToken,
           verifyTokenExpiry: Date.now() + 3600000, // 1 hour
        });
     } else if(emailType==='reset'){
      await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedToken,
            forgotPasswordExpiry: Date.now() + 3600000, // 1 hour
        });
    } 

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER!,
            pass: process.env.MAILTRAP_PASS!,
          }
      });
      console.log("📧 Sending email to:", email);
console.log("🔗 Verification link:", `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`);
const route = emailType === 'verify' ? 'verifyemail' : 'resetpassword';
    const mailOptions = {
        from: 'workmail.rezaul@gmail.com',
        to: email,
        subject: emailType === 'verify' ? 'Verify your email' : 'Reset your password',
        html: `<p>Click <a href="${process.env.DOMAIN}/${route}?token=${hashedToken}">here</a> to ${emailType === 'verify' ? 'verify your email' : 'reset your password'}
        or copy and paste the link below in your browser: <br>${process.env.DOMAIN}/${route}?token=${hashedToken}</p>`,
    
    };
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;

    } catch (error:any) {
      throw new Error(error.message);
        
    }
}