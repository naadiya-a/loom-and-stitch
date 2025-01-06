'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface StitchCounterProps {
  label: string;
  initialCount?: number;
}

export function StitchCounter({ label, initialCount = 0 }: StitchCounterProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div className="w-20 text-center">
      <Button
        variant="outline"
        size="sm"
        className="w-full bg-pink-100 hover:bg-pink-200"
        onClick={() => setCount((c) => c + 1)}
      >
        <Plus className="w-3 h-3" />
      </Button>
      <div className="py-1 text-center text-lg font-medium bg-gray-50">
        {count}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="w-full bg-pink-100 hover:bg-pink-200"
        onClick={() => setCount((c) => Math.max(0, c - 1))}
      >
        <Minus className="w-3 h-3" />
      </Button>
      <div className="mt-1 text-center text-xs font-medium truncate">
        {label}
      </div>
    </div>
  );
}
