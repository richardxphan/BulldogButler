import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    console.log('🔐 Middleware triggered for:', request.nextUrl.pathname);
    console.log('🧾 Token:', token);

    const protectedRoutes = ['/dashboard', '/profile', '/request', '/user'];

    const isProtected = protectedRoutes.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    );

    if (isProtected && !token) {
      console.warn('🚫 No valid session. Redirecting to login...');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('❌ Middleware error:', error);
    // Fail-safe: let the request through to prevent full app crash
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/dashboard',
    '/profile',
    '/request',
    '/user/:path*',
  ],
};
