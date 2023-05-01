'use client'

import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { db } from '../../firebase'
import ModelSelection from './ModelSelection'
import useSWR from 'swr'

export default function ChatInput({ chatId }: { chatId: string }) {
  const [prompt, setPrompt] = useState('')
  const { data: session } = useSession()
  const { data: model } = useSWR('model', {
    fallbackData: 'text-davinci-003',
  })

  const sendPrompt = async (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    if (!prompt) return
    const input = prompt.trim()
    setPrompt('')

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    }
    try {
      await addDoc(
        collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
        message
      )

      // Toast notification say loading
      const promise = () =>
        new Promise(async (resolve) => {
          const response = await fetch('/api/ask_question', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: input, chatId, model, session }),
          }).then((res) => res.json())
          resolve(response)
        })

      toast.promise(promise, {
        loading: 'ChatGPT is thinking...',
        success: (data) => {
          return `ChatGPT has responded!`
        },
        error: 'Error',
      })
    } catch (error) {
      toast.error('Event has not been created')
    }
  }

  return (
    <div className='vert-dark-gradient md:dark:border-transparentpb-4 absolute bottom-0 left-0 w-full border-t bg-white pt-2 dark:border-white/20 dark:bg-gray-800 md:border-t-0 md:border-transparent md:!bg-transparent '>
      <form
        onSubmit={sendPrompt}
        className='stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl'>
        <div className='relative flex h-full flex-1 items-stretch md:flex-col'>
          <div className=''>
            <div className='ml-1 flex h-full justify-center gap-0 md:m-auto md:mb-2 md:w-full md:gap-2'>
              <button className='btn btn-neutral relative border-0 md:border'>
                <div className='flex w-full items-center justify-center gap-2'>
                  <svg
                    stroke='currentColor'
                    fill='none'
                    strokeWidth='1.5'
                    viewBox='0 0 24 24'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='h-3 w-3'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'>
                    <polyline points='1 4 1 10 7 10'></polyline>
                    <polyline points='23 20 23 14 17 14'></polyline>
                    <path d='M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15'></path>
                  </svg>
                  Regenerate response
                </div>
              </button>
            </div>
          </div>
          <div className='relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-white py-2 shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:border-gray-900/50 dark:bg-gray-700 dark:text-white md:py-3 md:pl-4'>
            <textarea
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendPrompt(e)
                }
              }}
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              tabIndex={0}
              data-id='request-:R1dd6:-7'
              style={{ maxHeight: '200px', height: '24px', overflowY: 'hidden' }}
              placeholder='Send a message.'
              className='m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 outline-none focus:ring-0 focus-visible:ring-0 md:pl-0'
            />
            <button
              type='button'
              className='absolute bottom-1.5 right-1 rounded-md p-1 text-gray-500 hover:bg-gray-900 enabled:hover:text-gray-400 disabled:opacity-40 disabled:hover:bg-transparent md:bottom-2.5 md:right-2'
              disabled={!prompt || !session}>
              <PaperAirplaneIcon
                className={`${prompt ? 'text-white/50' : 'text-white/20'} h-4 w-4 -rotate-45 `}
              />
            </button>
          </div>
        </div>
      </form>
      <div className='hidden px-3 pb-3 pt-2 text-center text-xs text-gray-300 md:block md:px-4 md:pb-6 md:pt-3'>
        <span>
          Free Research Preview. ChatGPT can be wrong at times.{' '}
          <a
            href='https://help.openai.com/en/articles/6825453-chatgpt-release-notes'
            target='_blank'
            rel='noreferrer'
            className='underline'>
            ChatGPT Mar 23 Version
          </a>
        </span>
      </div>
      <div className='px-3 pb-4 md:hidden'>
        <ModelSelection />
      </div>
    </div>
  )
}
