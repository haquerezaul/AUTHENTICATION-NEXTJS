import {connect} from '@/dbConfig/dbConfig';
import { NextResponse , NextRequest} from 'next/server';
import User from '@/models/userModel';
import { tracingChannel } from 'diagnostics_channel';


connect();
export async function GET(request: NextRequest ) {
    try {
        const token = request.nextUrl.searchParams.get('token');
        if(!token){
            return NextResponse.json({error:'Token not provided'}, {status: 400});
        }
        console.log(token);
       
        const user= await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt: Date.now()}});
        if(!user){
            return NextResponse.json({error:'Invalid or expired token'}, {status: 400});
        }
        console.log(user);
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();
        return NextResponse.json({
            message:'Email verified successfully',
            success:true,
        });
        
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status: 500});
        
    }
}