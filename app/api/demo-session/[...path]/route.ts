import { NextRequest, NextResponse } from 'next/server'
import { DEMO_RUNTIME_ORIGIN, DEMO_SIGNED_URL_SEGMENTS } from '@/lib/demo-session'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const apiKey = process.env.SARVAM_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Session unavailable' }, { status: 503 })
  }

  const { path } = await context.params
  const allowed = DEMO_SIGNED_URL_SEGMENTS
  if (path.length !== allowed.length || path.some((segment, i) => segment !== allowed[i])) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const upstream = new URL(`${DEMO_RUNTIME_ORIGIN}${allowed.join('/')}`)
  request.nextUrl.searchParams.forEach((value, key) => {
    upstream.searchParams.set(key, value)
  })

  const response = await fetch(upstream, {
    method: 'GET',
    headers: { 'X-API-Key': apiKey },
    cache: 'no-store',
  })

  const body = await response.text()
  return new NextResponse(body, {
    status: response.status,
    headers: {
      'content-type': response.headers.get('content-type') ?? 'application/json',
    },
  })
}
