import { PlusIcon } from '@heroicons/react/24/solid'
import { db } from '../../firebase'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

export default function NewChat() {
  const { data: session } = useSession()
  const router = useRouter()

  const createChat = async () => {
    const doc = await addDoc(collection(db, 'users', session?.user?.email!, 'chats'), {
      userId: session?.user?.email!,
      createdAt: serverTimestamp(),
    })
    router.push(`/chat/${doc.id}`)
  }
  return (
    <div onClick={createChat} className='chatRow border border-gray-700'>
      <PlusIcon className='h-4 w-4' />
      <p>New Chat</p>
    </div>
  )
}
