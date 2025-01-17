import { PROMPT_CACHE_TAG } from '@/lib/constants'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const authHeader =
    request.headers.get('Authorization') || request.headers.get('authorization')

  if (!authHeader) {
    return NextResponse.json(
      { error: 'Unauthorized: No Authorization header provided' },
      { status: 401 }
    )
  }

  const [scheme, token] = authHeader.split(' ')
  if (scheme !== 'Bearer' || token !== process.env.API_TOKEN) {
    return NextResponse.json(
      { error: 'Unauthorized: Invalid token' },
      { status: 401 }
    )
  }

  // Revalidate the cache tag
  revalidateTag(PROMPT_CACHE_TAG)

  return NextResponse.json({ success: true })
}
