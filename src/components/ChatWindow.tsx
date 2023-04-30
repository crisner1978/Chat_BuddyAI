'use client'

import { collection, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import Message from './Message'
import { useEffect } from 'react'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline'

export default function ChatWindow({ chatId }: { chatId: string }) {
  const { data: session } = useSession()

  const [messages] = useCollection(
    session &&
      query(
        collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
        orderBy('createdAt', 'asc')
      )
  )

  useEffect(() => {
    const chatContainer = document.getElementById('chat_container')
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  }, [messages])

  return (
    <div id='chat_container' className='flex-1 overflow-y-auto scrollbar-hide '>
      {messages?.empty && (
        <>
          <p className='mt-10 text-center text-white'>Type a prompt in below to get started!</p>
          <ArrowDownCircleIcon className='mx-auto mt-5 h-10 w-10 animate-bounce text-white' />
        </>
      )}
      {messages?.docs.map((message, index) => (
        <Message key={message.id} message={message.data()} />
      ))}
      <div className='h-32 w-full flex-shrink-0 md:h-48'></div>
    </div>
  )
}
