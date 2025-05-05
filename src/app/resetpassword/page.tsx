'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ResetPasswordPage() {
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const tokenFromURL = window.location.search.split('=')[1]
    setToken(tokenFromURL || '')
  }, [])

  const handleSubmit = async () => {
    try {
      await axios.post('/api/users/resetpassword', { token, password })
      toast.success('Password reset successfully')
      setSuccess(true)
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Error resetting password')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl">Reset Password</h1>
      {success ? (
        <p>Password updated. You can login now.</p>
      ) : (
        <>
          <input
            type="password"
            className="border p-2 my-4"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit} className="border p-2 bg-green-400 text-white">
            Submit
          </button>
        </>
      )}
    </div>
  )
}