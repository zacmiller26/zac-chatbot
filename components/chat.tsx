'use client'

import ChatMessage from '@/components/chat-message'
import { useScrollToBottom } from '@/hooks/useScrollToBottom'
import { cn } from '@/lib/utils'
import { useChat } from 'ai/react'
import { FormEvent } from 'react'
import { FaCircleArrowUp } from 'react-icons/fa6'
import { toast } from 'sonner'

export default function Chat() {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>()

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/chat',
      maxSteps: 5,
      onResponse: (response: Response) => {
        if (response.status === 429) {
          toast.error('Too many requests. Please wait before trying again.')
        }
      }
    })

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    if (input.length === 0) return

    handleSubmit()
  }

  return (
    <div className='relative flex h-full w-full flex-col gap-4 overflow-hidden'>
      <div
        className='border-background-2 flex flex-1 flex-col gap-1.5 overflow-scroll rounded-xl border p-3 pb-0 md:p-8'
        ref={messagesContainerRef}
      >
        {messages.map((m, i) => {
          const isLastMessage = i === messages.length - 1

          return (
            <ChatMessage
              key={m.id}
              role={m.role === 'user' ? 'user' : 'ai'}
              message={m.content}
              isLoading={isLoading && isLastMessage}
            />
          )
        })}

        <div ref={messagesEndRef} className='min-h-4 w-full' />
      </div>

      <form
        onSubmit={onSubmit}
        className={cn(
          'bg-background-1 border-background-2 sticky bottom-0 flex w-full items-center rounded-xl border p-4 shadow transition-colors duration-300',
          'focus-within:border-foreground-1'
        )}
      >
        <input
          className={cn(
            'bg-background-1 block flex-1 text-foreground outline-none',
            'placeholder:text-foreground'
          )}
          value={input}
          placeholder='Ask a question about Zac...'
          onChange={handleInputChange}
        />
        <FaCircleArrowUp
          className={cn('h-6 w-6 cursor-pointer', 'md:hover:text-accent')}
          onClick={onSubmit}
        />
      </form>
    </div>
  )
}
