'use client'

import Link from 'next/link';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <nav className="flex items-center gap-4">
      <Link href="/" className="hover:text-gray-700 px-4 py-2 hover:bg-gray-100 rounded-md">
        Projects
      </Link>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-gray-1000 hover:text-gray-700 hover:bg-gray-100 rounded-md"
      >
        Logout
      </button>
    </nav>
  );
}
