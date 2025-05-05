'use client'
import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    try {
      await axios.post('/api/users/forgotpassword', { email })
      toast.success('Password reset link sent to your email')
      setSubmitted(true)
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Something went wrong')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl">Forgot Password</h1>
      {!submitted ? (
        <>
          <input
            className="border p-2 my-4"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubmit} className="border p-2 bg-blue-400 text-white">
            Submit
          </button>
        </>
      ) : (
        <p>Check your email for reset link</p>
      )}
    </div>
  )
}