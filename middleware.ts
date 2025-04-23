import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard', '/profile', '/request', '/user'];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isLogoutPage = pathname.startsWith('/logout');

  if (isProtected && !token && !isLogoutPage) {
    return NextResponse.redirect(new URL('/logout', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard',
    '/profile',
    '/request',
    '/user/:path*',
    '/logout', 
  ],
};
