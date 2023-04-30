import React, { ForwardRefExoticComponent, SVGProps } from 'react'

type InfoTextProps = {
  section: string
  Icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, 'ref'>>
  questions: string[]
}

export default function InfoText({ section, Icon, questions }: InfoTextProps) {
  return (
    <div className='mb-6 md:mb-0'>
      <div className='mb-5 flex flex-col items-center justify-center'>
        <Icon className='h-8 w-8' />
        <h2>{section}</h2>
      </div>
      <div className='space-y-2'>
        {questions.map((question, index) => (
          <p key={index} className='info_text'>
            {question}
          </p>
        ))}
      </div>
    </div>
  )
}
