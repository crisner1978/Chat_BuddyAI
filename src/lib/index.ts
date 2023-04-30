import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'

export const examplePrompts = [
  {
    section: 'Examples',
    Icon: SunIcon,
    questions: [
      'Explain quantum computing in simple terms',
      'Got any creative ideas for a 10 year old’s birthday?',
      'How do I make an HTTP request in Javascript?',
    ],
  },
  {
    section: 'Capabilities',
    Icon: BoltIcon,
    questions: [
      'Remembers what user said earlier in the conversation.',
      'Allows user to provide follow-up corrections.',
      'Trained to decline inappropriate requests.',
    ],
  },
  {
    section: 'Limitations',
    Icon: ExclamationTriangleIcon,
    questions: [
      'May occasionally generate incorrect information.',
      'May occasionally produce harmful instructions or biased content.',
      'Limited knowledge of world and events after 2021.',
    ],
  },
]
