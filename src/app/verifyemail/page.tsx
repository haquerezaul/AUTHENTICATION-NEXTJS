'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import React,{useEffect,useState} from 'react'

export default function verifyEmailPage() {
    const [token, setToken] = useState('')
    const[verified, setVerified] = useState(false)
    const[error, setError] = useState('')
  

    const verifyUserEmail=async()=>{
        try {
            await axios.get('/api/users/verifyemail', {
                params: { token }
              });
            console.log('Email verified successfully');
            setVerified(true)
        } catch (error:any) {
            console.log('Error verifying email',error.message);
            setError(error.message)
            
        }
    }

  useEffect(()=>{
    const urlToken=window.location.search.split('=')[1];
    setToken(urlToken || '');
  },[]);

  useEffect(()=>{
    if(token.length>0){
        verifyUserEmail();
    }

  },[token])
  return(
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>

        <h1 className='text-4xl'>VERIFY EMAIL</h1>
        <h2 className='p-2 bg-amber-500'>{token?`${token}`:'no token'}</h2>
        {verified && (
            <div><h2 className='p-2 mt-7 bg-green-500' >Email verified successfully</h2><Link href={'/login'}>
                <button className='p-2 border border-pink-400 rounded-lg
                mt-7 focus:outline-none focus:border-green-900'>Login</button>
              </Link>
              </div>
        )}

        {error && (
            <div><h2 className='p-2 mt-7 bg-red-500 text-2xl'>Error</h2>
              </div>
        )}

        </div>
  )

}


