import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;

  // 1. Subdomain Gate Warga / Kependudukan (warga.supercali.tech atau citizen.supercali.tech)
  if (hostname.startsWith('warga.') || hostname.startsWith('citizen.')) {
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/warga', request.url));
    }
  }

  // 2. Subdomain Gate Kepolisian (scvp.supercali.tech atau police.supercali.tech)
  if (hostname.startsWith('scvp.') || hostname.startsWith('police.')) {
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/scvp', request.url));
    }
  }

  // 3. Subdomain Gate Medis (arcane.supercali.tech atau ems.supercali.tech)
  if (hostname.startsWith('arcane.') || hostname.startsWith('ems.')) {
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/arcane', request.url));
    }
  }

  // 4. Subdomain Gate Bengkel UltraSpeed (ultraspeed.supercali.tech)
  if (hostname.startsWith('ultraspeed.') || hostname.startsWith('rizz.') || hostname.startsWith('mechanic.')) {
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/ultraspeed', request.url));
    }
  }

  // 5. Subdomain Gate KenClub VIP (kenclub.supercali.tech)
  if (hostname.startsWith('kenclub.') || hostname.startsWith('vanilla.') || hostname.startsWith('club.')) {
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/kenclub', request.url));
    }
  }

  // 6. Subdomain Loket Layanan Publik & Whitelist Job (loket.supercali.tech)
  if (hostname.startsWith('loket.')) {
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/loket', request.url));
    }
  }

  // 7. Subdomain Staff Console & Petugas (staff.supercali.tech)
  if (hostname.startsWith('staff.')) {
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/staff', request.url));
    }
  }

  // 8. Subdomain City Hub & Analytics (city.supercali.tech)
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
