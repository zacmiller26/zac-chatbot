import CopyButton from '@/components/ui/copy-button'
import { cn } from '@/lib/utils'
import { FiCopy } from 'react-icons/fi'
import { TbSparkles } from 'react-icons/tb'

type ChatRole = 'user' | 'ai'

interface ChatMessageProps {
  role: ChatRole
  message: string
  isLoading?: boolean
}

export default function ChatMessage({
  role,
  message,
  isLoading
}: ChatMessageProps) {
  switch (role) {
    case 'user':
      return <UserMessage message={message} />

    case 'ai':
      return <AiMessage message={message} isLoading={isLoading} />

    default:
      throw new Error(`Unknown role: ${role}`)
  }
}

interface MessageProps {
  message: string
  isLoading?: boolean
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

export function AiMessage({ message, isLoading }: MessageProps) {
  return (
    <div className='flex justify-start gap-3'>
      <div
        className={cn(
          'border-background-2 flex h-9 w-9 items-center justify-center rounded-full border text-foreground transition-colors duration-300',
          isLoading && 'text-accent border-accent animate-pulse'
        )}
      >
        <TbSparkles className='h-5 w-5' />
      </div>
      <div className='flex flex-1 flex-col justify-start gap-2'>
        <div className='bg-secondary w-full flex-1'>
          <p className='whitespace-pre-wrap text-foreground'>{message}</p>
        </div>
        {!isLoading && (
          <div>
            <CopyButton
              className={cn(
                'border-background-2 text-foreground-2 rounded-md border p-1.5',
                'md:hover:text-accent md:hover:border-accent'
              )}
              copyText={message}
            >
              <FiCopy className='h-3 w-3' />
            </CopyButton>
          </div>
        )}
      </div>
    </div>
  )
}
