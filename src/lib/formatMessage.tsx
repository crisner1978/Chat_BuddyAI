import { DocumentData } from "firebase/firestore"

export default function formatMessage(message: Message | DocumentData) {
  let text = message.text.trim()

  if (
    text.startsWith('//') ||
    text.startsWith('/*') ||
    text.startsWith('const') ||
    text.startsWith('.\n')
  ) {
    return (
      <pre className='w-full overflow-x-auto rounded-md bg-black p-10'>
        <code className='w-full text-white'>{text.substr(1).trim()}</code>
      </pre>
    )
  } else if (text.startsWith('1.')) {
    const listItems = text.split('\n').map((item: string, index: React.Key | null | undefined) => (
      <li className='before:ml-2' key={index}>
        {item.substr(2)}
      </li>
    ))

    return <ol className='list-inside list-decimal'>{listItems}</ol>
  } else {
    return <p>{text}</p>
  }
}