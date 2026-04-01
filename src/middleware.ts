import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the user has an active session cookie
  const isAuthenticated = request.cookies.has('rk-auth-session');

  const { pathname } = request.nextUrl;

  // Allow access to the login page and Next.js static assets/APIs without a token
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/favicon.ico') ||
    pathname.startsWith('/api/') ||
    pathname === '/login'
  ) {
    // If they are authenticated and trying to access /login, redirect them silently to Home
    if (isAuthenticated && pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // If ANY other page is requested and they are NOT authenticated, force them to Login!
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Otherwise, user is authenticated and allowed to pass!
  return NextResponse.next();
}

// Config blocks middleware from running on static assets to preserve speed
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
