// /app/components/Chat.tsx

'use client'

import ChatMessage from '@/components/chat-message'
import { useScrollToBottom } from '@/hooks/useScrollToBottom'
import { cn } from '@/lib/utils'
import { useChat } from 'ai/react'
import { FormEvent } from 'react'

export default function Chat() {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>()

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    // This is the endpoint where we send/receive messages
    api: '/api/chat',
    // If you want to limit the chain-of-thought or number of steps:
    maxSteps: 5
  })

  // On form submit, we send the user input
  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    handleSubmit()
  }

  return (
    <div className='relative flex h-full w-full flex-col'>
      <div className='flex flex-1 flex-col gap-1.5' ref={messagesContainerRef}>
        {messages.map(m => (
          <ChatMessage
            key={m.id}
            role={m.role === 'user' ? 'user' : 'ai'}
            message={m.content}
          />
        ))}

        <div
          ref={messagesEndRef}
          className='min-h-[68px] min-w-[24px] shrink-0'
        />
      </div>

      <form onSubmit={onSubmit} className={cn('sticky bottom-0 flex w-full')}>
        <input
          className={cn(
            'block flex-1 rounded border border-foreground bg-background p-2 text-foreground outline-none transition-colors duration-300',
            'focus:border-accent'
          )}
          value={input}
          placeholder='Ask a question about Zac...'
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}
