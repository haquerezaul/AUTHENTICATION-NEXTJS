import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

connect();

export async function GET(request: NextRequest) {
    try {
      const userId = getDataFromToken(request);
      const user = await User.findOne({_id:userId}).select("-password");
      return NextResponse.json({
        message: "User data fetched successfully",
        success: true,
        data:user,
      });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}