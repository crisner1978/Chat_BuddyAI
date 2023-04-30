'use client'

import { signIn } from 'next-auth/react'
import React from 'react'
import ChatGPTIcon from './ChatGPTIcon'

export default function Login() {
  return (
    <div className='flex h-screen flex-col items-center justify-center space-y-4 bg-GRAY_1 text-white'>
      <ChatGPTIcon />
      <h1 className='text-2xl font-bold'>Welcome to ChatGPT</h1>
      <p className='font-extralight'>Log in with your Google Account to continue</p>
      <div className='space-x-3 text-sm'>
        <button onClick={() => signIn('google')} className='w-16 rounded-md bg-[#11A37F] py-2'>
          Log in
        </button>
        <button className='w-16 rounded-md bg-[#11A37F] py-2'>Sign up</button>
      </div>
    </div>
  )
}
