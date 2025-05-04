import React from 'react'

function UserProfile({params}: any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-4xl'>User Profile</h1>
        <hr />
        <p className='text-2xl'>Welcome to your profile!
            <span className='bg-pink-500 rounded p-2 ml-2'>{params.id}</span>
        </p>
    
        
    </div>
  )
}

export default UserProfile
