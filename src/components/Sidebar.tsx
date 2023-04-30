'use client'
/* eslint-disable @next/next/no-img-element */
import { collection, orderBy, query } from 'firebase/firestore'
import { signOut, useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import ChatRow from './ChatRow'
import ModelSelection from './ModelSelection'
import NewChat from './NewChat'

export default function Sidebar() {
  const { data: session } = useSession()
  const [chats, loading, error] = useCollection(
    session &&
      query(collection(db, 'users', session?.user?.email!, 'chats'), orderBy('createdAt', 'asc'))
  )

  return (
    <div className='flex h-screen flex-col overflow-y-auto bg-DARK_1 p-2 md:max-w-[260px]'>
      <div className='flex-1'>
        <div>
          <NewChat />
          <div className='hidden md:inline'>
            <ModelSelection />
          </div>
          <div className='my-2 flex flex-col space-y-2'>
            {loading && (
              <div className='my-2 animate-pulse text-center text-sm text-white'>
                <p>Loading Chats...</p>
              </div>
            )}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {/* Session */}
      {session && (
        <img
          onClick={() => signOut()}
          className='mx-auto mb-2 h-12 w-12 cursor-pointer rounded-full hover:opacity-50'
          src={session?.user?.image!}
          alt='Profile'
        />
      )}
    </div>
  )
}
