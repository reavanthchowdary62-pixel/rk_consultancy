import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  // Extract and verify the JWT securely
  const token = request.cookies.get('rk-auth-session')?.value;
  const session = await verifySessionToken(token);
  const isAuthenticated = !!session;

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

  // Secure Admin Routes 
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) return NextResponse.redirect(new URL('/login', request.url));
    if (session?.role !== "ADMIN") {
      // Unauthorized, send back to home
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // If ANY other user page is requested and they are NOT authenticated, force them to Login!
  if (!isAuthenticated && !pathname.includes('/public')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Otherwise, user is authenticated and allowed to pass!
  return NextResponse.next();
}

// Config blocks middleware from running on static assets to preserve speed
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
