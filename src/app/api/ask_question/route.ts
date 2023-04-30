import query from '@/lib/queryApi'
import { adminDB } from '../../../../firebaseAdmin'
import { NextResponse } from 'next/server'
import admin from 'firebase-admin'

export async function POST(request: Request) {
  const body = await request.json()
  const { prompt, chatId, model, session } = body

  if (!prompt) {
    return new Response('Missing prompt', { status: 400 })
  }
  if (!chatId) {
    return new Response('Missing chatId', { status: 400 })
  }

  const response = await query(prompt, chatId, model)
  const message: Message = {
    text: response || 'ChatGPT was unable to find an answer for that!',
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: 'ChatGPT',
      name: 'ChatGPT',
      avatar: 'https://links.papareact.com/89k',
    },
  }

  await adminDB
    .collection('users')
    .doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message)

  return NextResponse.json({ answer: message.text })
}
