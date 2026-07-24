import './globals.css';

export const metadata = {
  title: 'Supercali RP — Official Public Portal & Subdomain Gates',
  description: 'Ekosistem Portal Resmi, KTP Digital IC, DMV STNK, Loket Terpadu, & Console Direksi Supercali RP',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="bg-[#060812] text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
