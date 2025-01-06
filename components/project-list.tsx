'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

export function ProjectList() {
  return (
    <div className="w-64 h-full overflow-y-auto border-r bg-muted">
      <div className="p-4 space-y-4">
        <Link
          href="/projects/new"
          className="flex items-center justify-center gap-2 p-8 text-gray-600 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">New project</span>
        </Link>
        <Link
          href="/projects/socks"
          className="block p-8 text-center text-xl font-semibold bg-[#FFE4C4] rounded-lg hover:bg-[#FFD5B4] transition-colors"
        >
          Socks
        </Link>
        <Link
          href="/projects/sweater"
          className="block p-8 text-center text-xl font-semibold bg-[#FFE4C4] rounded-lg hover:bg-[#FFD5B4] transition-colors"
        >
          Sweater
        </Link>
      </div>
    </div>
  );
}
