import CopyButton from '@/components/ui/copy-button'
import { FiCopy } from 'react-icons/fi'
import { TbSparkles } from 'react-icons/tb'

type ChatRole = 'user' | 'ai'

interface ChatMessageProps {
  role: ChatRole
  message: string
}

export default function ChatMessage({ role, message }: ChatMessageProps) {
  switch (role) {
    case 'user':
      return <UserMessage message={message} />

    case 'ai':
      return <AiMessage message={message} />

    default:
      throw new Error(`Unknown role: ${role}`)
  }
}

interface MessageProps {
  message: string
}

export function UserMessage({ message }: MessageProps) {
  return (
    <div className='flex justify-end gap-2'>
      <div className='bg-primary w-fit rounded-lg p-2'>
        <p className='cursor-default whitespace-pre-wrap rounded-lg bg-foreground px-3 py-1 text-background'>
          {message}
        </p>
      </div>
    </div>
  )
}

export function AiMessage({ message }: MessageProps) {
  return (
    <div className='flex justify-start gap-3'>
      <div className='border-background-2 flex h-9 w-9 items-center justify-center rounded-full border'>
        <TbSparkles className='h-5 w-5 text-foreground' />
      </div>
      <div className='flex flex-1 flex-col justify-start gap-2'>
        <div className='bg-secondary w-full flex-1'>
          <p className='whitespace-pre-wrap text-foreground'>{message}</p>
        </div>
        <div>
          <CopyButton
            className='border-background-2 text-foreground-2 rounded-md border p-1.5'
            copyText={message}
          >
            <FiCopy className='h-3 w-3' />
          </CopyButton>
        </div>
      </div>
    </div>
  )
}
