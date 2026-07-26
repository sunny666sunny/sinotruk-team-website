import Link from 'next/link';
import { ClipboardList } from 'lucide-react';
import { useEffect, useState } from 'react';
import { readShortlist } from '@/lib/procurement/shortlist';

interface ShortlistButtonProps {
  className?: string;
  onNavigate?: () => void;
}

export default function ShortlistButton({ className = '', onNavigate }: ShortlistButtonProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(readShortlist().length);
    sync();
    window.addEventListener('sinotruk-shortlist-change', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('sinotruk-shortlist-change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return (
    <Link
      href="/shortlist"
      onClick={onNavigate}
      className={`inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-signal)] ${className}`.trim()}
    >
      <ClipboardList className="h-4 w-4" aria-hidden="true" />
      <span>Shortlist ({count})</span>
    </Link>
  );
}
