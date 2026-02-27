import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow internal Next.js paths, API routes, the main page, and public assets
  if (
    pathname === '/' ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    // Include the path to the video directly
    pathname.includes('Thềm Xưa Cảm ơn và Tạm biệt.mp4') ||
    pathname.match(/\.(png|jpe?g|gif|svg|ico|mp4)$/i)
  ) {
    return NextResponse.next();
  }

  // Redirect everything else to home effectively disabling all other routes
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: '/(.*)',
};
