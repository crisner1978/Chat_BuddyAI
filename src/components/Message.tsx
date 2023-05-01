/* eslint-disable @next/next/no-img-element */
import formatMessage from '@/lib/formatMessage'
import { DocumentData } from 'firebase/firestore'
import React from 'react'

type Props = {
  message: DocumentData | Message
}

export default function Message({ message }: Props) {
  const isChatGPT = message.user.name === 'ChatGPT'
  const isCodeBlock = message.text.includes('`') || message.text.includes('```')
  const messageText = isCodeBlock ? <pre>{message.text}</pre> : <p>{message.text}</p>

  return (
    <div className={`py-6 text-white ${isChatGPT ? 'bg-GRAY_2' : ''}`}>
      <div className='mx-auto flex max-w-3xl items-start space-x-5 px-4 md:pr-10'>
        <img src={message.user.avatar} alt={message.user.name} className='h-[30px] w-[30px]' />
        <div className='w-full pt-1 text-sm leading-6 md:pr-10 overflow-x-scroll whitespace-pre-wrap scrollbar-hide'>{formatMessage(message)}</div>
      </div>
    </div>
  )
}
