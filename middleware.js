import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;

  // 1. Subdomain Loket Medis & Layanan Publik (loket.supercali.tech)
  if (hostname.startsWith('loket.')) {
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/loket', request.url));
    }
  }

  // 2. Subdomain Staff Console & Petugas (staff.supercali.tech)
  if (hostname.startsWith('staff.')) {
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/staff', request.url));
    }
  }

  // 3. Subdomain City Hub & Analytics (city.supercali.tech)
  if (hostname.startsWith('city.')) {
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
