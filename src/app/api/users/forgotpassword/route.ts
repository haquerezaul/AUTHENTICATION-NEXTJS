import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { sendEmail } from '@/helper/mailer'

connect()

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    await sendEmail({ email, emailType: 'reset', userId: user._id })
    return NextResponse.json({ message: 'Reset link sent', success: true })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}