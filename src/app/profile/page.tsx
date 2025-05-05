'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import axios from 'axios'
import toast from 'react-hot-toast';
import Link from 'next/link';


function ProfilePage() {
    const router = useRouter()
    const[data, setData] = useState('nothing')
    const logout = async () => {
        try {
           await axios.get('/api/users/logout')
            console.log('Logout Success');
            toast.success('Logout successful');
           router.push('/login');

        } catch (error: any) {
            console.log('Logout failed', error.message);
            toast.error('Error logging out');
            
        }
    }

    const getUserDetails=async () => {
        const res=await axios.get('/api/users/me');
        console.log('User Details',res.data);
        setData(res.data.data._id);
    }

  return (
   
    <div className='flex flex-col items-center    justify-center min-h-screen py-2'>
        <h1 className='text-4xl'>Profile Page</h1>
        <hr />
        <p className='text-2xl'>Welcome to your profile!</p>
        <h2 className='p-3 mt-7 rounder bg-amber-500'>{data==='nothing' ? "nothing":
            <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      
        <button
        className='p-2 border border-pink-400 rounded-lg
        mt-7 focus:outline-none focus:border-green-900'
        onClick={logout}
        >Logout</button>

        <button
        className='p-2 border border-pink-400 rounded-lg
        mt-7 focus:outline-none focus:border-green-900'
        onClick={getUserDetails}
        >Get user Data</button>
    </div>
    
  )
}

export default ProfilePage
