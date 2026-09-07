import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase()

  if (host === 'img64.dev') {
    const url = request.nextUrl.clone()
    url.protocol = 'https:'
    url.host = 'www.img64.dev'
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
