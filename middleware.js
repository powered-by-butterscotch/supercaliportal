import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;

  // 1. Jika diakses lewat Subdomain Loket / Medis (contoh: loket.supercalirp.com atau ems.supercalirp.com)
  if (hostname.startsWith('loket.') || hostname.startsWith('ems.')) {
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/loket', request.url));
    }
  }

  // 2. Jika diakses lewat Subdomain Staff / Admin (contoh: staff.supercalirp.com)
  if (hostname.startsWith('staff.') || hostname.startsWith('admin.')) {
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/staff', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
