'use client'

import React from 'react'
import useSWR from 'swr'
import Select from 'react-select'

const fetchModels = () => fetch('/api/get_engines').then((res) => res.json())

export default function ModelSelection() {
  const { data: models, isLoading } = useSWR('models', fetchModels)
  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData: 'text-davinci-003',
  })

  console.log('data', models)
  return (
    <div className='bg-[#434654] text-DARK_1'>
      <Select
        defaultValue={model}
        isSearchable
        options={models?.modelOptions}
        placeholder={model}
        menuPosition='fixed'
        className='mt-2'
        onChange={(e) => setModel(e.value)}
      />
    </div>
  )
}
