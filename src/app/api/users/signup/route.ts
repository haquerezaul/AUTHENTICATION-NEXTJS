import {connect} from '@/dbConfig/dbConfig';
import { NextResponse , NextRequest} from 'next/server';
import User from '@/models/userModel';
import bcrypt from 'bcrypt';
import { sendEmail } from '@/helper/mailer';




connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);
        // Check if user already exists
         const user= await User.findOne({email}) 
         if(user){
             return NextResponse.json({error:'User already exists'}, {status: 400});
         }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create a new user
        const newUser=new User({
            username,
            email,
            password: hashedPassword,
        })
        const savedUser=await newUser.save();
        console.log(savedUser);

   
      try {
        await sendEmail ({email, emailType:'verify', userId:savedUser._id});

        return NextResponse.json({
            message:'User created successfully', 
            success:true,
            data: savedUser,
        });
        
      } catch (error:any) {
        return NextResponse.json({error:error.message}, {status: 500});
        
      }

        
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status: 500});
        
    }
}