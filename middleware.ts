import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register')
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')
  const isAPI = request.nextUrl.pathname.startsWith('/api')
  
  // Check if user has auth cookie
  const hasAuth = request.cookies.has('sb-access-token') || 
                  request.cookies.has('sb-refresh-token')
  
  // Redirect authenticated users away from auth pages
  if (isAuthPage && hasAuth) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Protect dashboard routes
  if (isDashboard && !hasAuth && !request.nextUrl.pathname.includes('/api')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Add CORS headers for API routes
  if (isAPI) {
    const response = NextResponse.next()
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    '/login',
    '/register'
  ]
}