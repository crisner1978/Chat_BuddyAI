import ChatInput from '@/components/ChatInput'
import ChatWindow from '@/components/ChatWindow'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

export default function ChatPage({ params: { id } }: Props) {
  return (
    <div className='transition-width relative flex h-screen w-full flex-1 flex-col items-stretch overflow-hidden'>
      <ChatWindow chatId={id} />
      <ChatInput chatId={id} />
    </div>
  )
}
