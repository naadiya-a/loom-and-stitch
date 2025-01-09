import './globals.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import Navbar from '@/components/nav-bar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🧶</text></svg>"
      ></link>
      <body className={`${inter.className} flex flex-col h-screen bg-white`}>
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="text-3xl">
            Loom & Stitch
          </Link>
          <Navbar />
        </div>
        <main className="flex-1 flex overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
