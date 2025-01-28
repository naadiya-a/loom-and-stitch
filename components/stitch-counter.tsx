'use client';

import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface StitchCounterProps {
  label: string;
  initialCount?: number;
  onCountChange: (count: number) => void;
}

export function StitchCounter({
  label,
  initialCount = 0,
  onCountChange,
}: StitchCounterProps) {
  const [count, setCount] = useState(initialCount);

  console.log('StitchCounter props:', { label, initialCount, onCountChange });

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  const decrement = () => {
    const newCount = Math.max(0, count - 1);
    setCount(newCount);
    onCountChange?.(newCount);
  };

  return (
    <div className="w-20 text-center">
      <Button
        variant="outline"
        size="sm"
        className="w-full bg-pink-100 hover:bg-pink-200"
        onClick={increment}
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
        onClick={decrement}
      >
        <Minus className="w-3 h-3" />
      </Button>
      <div className="mt-1 text-center text-xs font-medium truncate">
        {label}
      </div>
    </div>
  );
}
