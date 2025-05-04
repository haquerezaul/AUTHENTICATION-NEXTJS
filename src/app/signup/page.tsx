'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import axios  from 'axios'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useState } from 'react';

function SignUp() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    username: '',
    email: '',
    password: '',
  })
const [buttonDisabled, setButtonDisabled] = React.useState(false);
const[loading, setLoading] = React.useState(false);

const onSignup=async()=>{
  try {
      
    setLoading(true);
    const response=await axios.post('/api/users/signup',user);
    console.log('Signup Success',response.data);
    router.push("/login");
  

  } catch (error:any) {
    console.log(error);
    toast.error('Error signing up');
  
  } finally{
  setLoading(false);
  }


}

useEffect(() => {
  if( user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
    setButtonDisabled(false);
  }else{
    setButtonDisabled(true);
  }
}, [user]);


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
       <h1>{loading?'Processing':'SignUp'} </h1>
       <hr />
       <label htmlFor="username">username</label>
       <input 
         className='p-2 border border-green-400 rounded-lg
         mb-4 focus:outline-none focus:border-yellow-300'
          id='username'
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder='username'
       />
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
            onClick={onSignup}
          >
            {buttonDisabled ? 'Loading...' : 'Sign Up'}
          </button>
          <p>Already have an account? <Link href="/login" className='text-blue-500'>Login</Link></p>
    </div>
  )
}

export default SignUp
