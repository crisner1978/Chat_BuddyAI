import { DocumentData } from 'firebase/firestore'

export default function formatMessage(message: Message | DocumentData) {
  let text = message.text.trim()
  console.log('text', text)

  // Check if the text is a code block
  if (
    text.startsWith('const') ||
    text.startsWith('function') ||
    (text.startsWith('{') && text[text.length - 1] === '}')
  ) {
    return (
      <pre style={{ padding: '16px' }} className='w-full rounded-md bg-DARK_1'>
        <code className='w-full whitespace-pre-wrap text-white'>{text.trim()}</code>
      </pre>
    )
  }
  // Check if the text is an ordered list
  else if (text.includes('1.')) {
    const listItems = text.split('\n').map((item: string, index: React.Key | null | undefined) => {
      // Check if the item contains a URL
      if (item.includes('http')) {
        const regex = /[()]/g
        const urlStart = item.indexOf('http')
        const urlEnd = item.indexOf(' ', urlStart)
        const url =
          urlEnd === -1
            ? item.slice(urlStart).replace(/\(|\)/g, '')
            : item.slice(urlStart, urlEnd).replace(/\(|\)/g, '')
        const textBefore = item.slice(0, urlStart - 1)
        const textAfter = urlEnd === -1 ? '' : item.slice(urlEnd)

        console.log('textBefore', textAfter)
        return (
          <li className='before:ml-2' key={index}>
            {textBefore}
            <a style={{ color: 'lightseagreen' }} href={url} target='_blank' rel='noopener noreferrer'>
              {url}
            </a>
            {textAfter}
          </li>
        )
      }
      return (
        <li className='before:ml-2' key={index}>
          {item.trim()}
        </li>
      )
    })

    return <ol className='list-inside list-decimal'>{listItems}</ol>
  }
  // Check if the text is a paragraph
  else {
    // Check if the paragraph contains a URL
    if (text.includes('http')) {
      const urlStart = text.indexOf('http')
      const urlEnd = text.indexOf(' ', urlStart)
      const url = urlEnd === -1 ? text.slice(urlStart) : text.slice(urlStart, urlEnd)
      const textBefore = text.slice(0, urlStart)
      const textAfter = urlEnd === -1 ? '' : text.slice(urlEnd)
      return (
        <p>
          {textBefore}
          <a href={url} target='_blank' rel='noopener noreferrer'>
            {url}
          </a>
          {textAfter}
        </p>
      )
    }
    return <p>{text}</p>
  }
}
