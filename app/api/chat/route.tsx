import { FIRST_NAME, LAST_NAME } from '@/lib/constants'
import { queryContext, queryInstructions } from '@/lib/db/queries'
import {
  populateSystemMessage,
  systemMessageTemplate
} from '@/lib/templates/systemMessage'
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { unstable_cache } from 'next/cache'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const requestDataSchema = z.array(
  z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })
)

const loadCachedPromptData = unstable_cache(
  async () => {
    return await Promise.all([queryInstructions(), queryContext()])
  },
  ['promptQueries'],
  { revalidate: 60 * 60 * 24 }
)

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const { data, error } = requestDataSchema.safeParse(messages)

  if (!data || error) {
    console.log('Invalid request:', error)
    return new Response('Invalid request', { status: 400 })
  }

  const [instructions, context] = await loadCachedPromptData()

  const systemMessage: {
    role: 'system'
    content: string
  } = {
    role: 'system',
    content: populateSystemMessage(systemMessageTemplate, {
      first_name: FIRST_NAME,
      last_name: LAST_NAME,
      bio: context.bio,
      skills: context.skills,
      fallbackPersonal: instructions.fallbackPersonal,
      fallbackSkills: instructions.fallbackSkills,
      fallbackUnrelated: instructions.fallbackUnrelated
    })
  }

  const result = streamText({
    model: openai('gpt-4o'),
    messages: [systemMessage, ...data]
  })

  return result.toDataStreamResponse()
}
