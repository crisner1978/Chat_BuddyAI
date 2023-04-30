import InfoText from '@/components/InfoText'
import { examplePrompts } from '@/lib'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className='flex h-screen flex-col items-center justify-center px-2 text-white'>
      <h1 className='mb-20 text-5xl font-bold'>ChatGPT</h1>

      <div className='flex flex-col space-x-2 text-center md:flex-row'>
        {examplePrompts.map((prompt) => (
          <InfoText key={prompt.section} {...prompt} />
        ))}
      </div>
    </main>
  )
}
