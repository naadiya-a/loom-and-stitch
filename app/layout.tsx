'use client';
import './globals.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import Navbar from '@/components/nav-bar';
import AuthContext, { AuthProvider } from '@/context/authContext';
import { use } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = use(AuthContext);

  return (
    <html lang="en">
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🧶</text></svg>"
      ></link>
      <body className={`${inter.className} flex flex-col h-screen bg-white`}>
        <AuthProvider>
          <div className="flex items-center justify-between h-16 px-4">
            <Link href="/" className="text-3xl">
              Loom & Stitch
            </Link>
            {userId && <Navbar />}
          </div>
          <main className="flex-1 flex overflow-hidden">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
