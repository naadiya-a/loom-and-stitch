import './globals.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen bg-white`}>
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="text-3xl">
            Loom & Stitch
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/" className="hover:text-gray-600 px-4">
              Projects
            </Link>
          </nav>
        </div>
        <main className="flex-1 flex overflow-hidden">{children}</main>
      </body>
    </html>
  );
}
