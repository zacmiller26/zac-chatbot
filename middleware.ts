import redis from '@/lib/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { ipAddress, next } from '@vercel/edge'
import { NextResponse, type NextRequest } from 'next/server'

const ratelimit = new Ratelimit({
  redis,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5, '10 s')
})

export const config = {
  matcher: ['/api/chat']
}

export async function middleware(request: NextRequest) {
  const ip = ipAddress(request) || '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  return success
    ? next()
    : NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
}
