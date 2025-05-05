import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'

connect()

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordExpiry: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json({ error: 'Token is invalid or expired' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword
    user.forgotPasswordToken = undefined
    user.forgotPasswordExpiry = undefined
    await user.save()

    return NextResponse.json({ message: 'Password reset successful', success: true })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}