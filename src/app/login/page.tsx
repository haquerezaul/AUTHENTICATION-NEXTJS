'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useState } from 'react';

function Login() {
  const [user, setUser] = React.useState({
    
    email: '',
    password: '',
  })
  const router = useRouter()
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const[loading, setLoading] = React.useState(false);
  
  const onLogin=async()=>{
    try {
      setLoading(true);
      const response=await axios.post('/api/users/login',user);
      console.log('Login Success',response.data);
      toast.success('Login successful');
      router.push("/profile");
      
    } catch (error:any) {
      console.log('LOGIN FAILED',error.message); 
      toast.error('Error logging in'); 
      
    }finally{
      setLoading(false);
    }
  }
  
  useEffect(() => {
    if( user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  }, [user]);


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
       <h1>{loading?'processing':'Login'}</h1>
       <hr />
     
       <label htmlFor="email">email</label>
       <input 
         className='p-2 border border-green-400 rounded-lg
         mb-4 focus:outline-none focus:border-yellow-300'
          id='email'
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='email'
          />
          <label htmlFor="password">password</label>
       <input 
         className='p-2 border border-green-400 rounded-lg
         mb-4 focus:outline-none focus:border-yellow-300'
          id='password'
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='password'
          />
          <button 
            className='p-2 border border-pink-400 rounded-lg
            mb-4 focus:outline-none focus:border-green-900'
            onClick={onLogin}
          >
            {buttonDisabled ? 'Loading...' : 'Login'}
          </button>
          <p>Don't have an account? <Link href="/signup" className='text-blue-500'>Sign Up</Link></p>
    </div>
  )
}

export default Login

