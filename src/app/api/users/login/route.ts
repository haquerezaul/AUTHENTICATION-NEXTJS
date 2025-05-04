import {connect} from '@/dbConfig/dbConfig';
import { NextResponse , NextRequest} from 'next/server';
import User from '@/models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);
        // Check if user exists
         const user= await User.findOne({email})    
            if(!user){
                return NextResponse.json({error:'User does not exist'}, {status: 400});
            }
        // Check if password is correct
        const validpassword = await bcrypt.compare(password, user.password);
        if(!validpassword){
            return NextResponse.json({error:'Invalid credentials'}, {status: 400});
        }

        //Create token data
        const tokenData={
            id:user._id,
            email:user.email,
            username:user.username,
        }
        // Create a new token
        const token =await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: '1d',
        });
         
        const response= NextResponse.json({
            message:'Login successful',
            success:true,
        });
        // Set the token in the cookie
        response.cookies.set('token', token, {
            httpOnly: true,
        });
        return response;  


    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status: 500});
        
    }
}
   