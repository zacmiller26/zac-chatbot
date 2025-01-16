'use client'

import ChatMessage from '@/components/chat-message'
import Waterfall from '@/components/ui/waterfall'
import { useScrollToBottom } from '@/hooks/useScrollToBottom'
import { FIRST_NAME, LAST_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useChat } from 'ai/react'
import { FormEvent } from 'react'
import { FaCircleArrowUp } from 'react-icons/fa6'
import { toast } from 'sonner'

const suggestedActions = [
  {
    label: `Who is ${FIRST_NAME}?`,
    action: `Who is ${FIRST_NAME} ${LAST_NAME}?`
  },
  {
    label: `What are his technical skills?`,
    action: `What are ${FIRST_NAME}'s core technical skills?`
  },
  {
    label: `What is his recent work experience?`,
    action: `What has ${FIRST_NAME} recently worked on?`
  },
  {
    label: `What makes him stand out?`,
    action: `What makes ${FIRST_NAME} stand out as a candidate?`
  }
]

export default function Chat() {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>()

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append
  } = useChat({
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
    handleSubmit()
  }

  function handleSuggestedQuestionClick(action: string) {
    append({
      content: action,
      role: 'user'
    })
  }

  return (
    <div className='relative flex h-full w-full flex-col gap-4 overflow-hidden'>
      <div
        className='border-background-2 relative flex flex-1 flex-col gap-1.5 overflow-scroll rounded-xl border'
        ref={messagesContainerRef}
      >
        <div className='flex-1 space-y-3 p-3 pb-0 md:p-8'>
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

          {isLoading &&
            messages.length > 0 &&
            messages[messages.length - 1].role === 'user' && (
              <span className='animate-pulse'>Thinking...</span>
            )}
        </div>

        <div ref={messagesEndRef} className='min-h-4 w-full' />

        {messages.length === 0 && (
          <Waterfall className='sticky bottom-0 left-0 flex w-full flex-wrap gap-2 p-4'>
            {suggestedActions.map(({ label, action }, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestionClick(action)}
                className={cn(
                  'border-accent text-accent rounded-lg border px-3 py-1 transition-colors duration-150',
                  'md:hover:border-foreground md:hover:text-foreground'
                )}
              >
                {label}
              </button>
            ))}
          </Waterfall>
        )}
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
