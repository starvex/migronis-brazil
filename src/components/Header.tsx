'use client';

import Link from 'next/link';

interface HeaderProps {
  siteName?: string;
}

export default function Header({ siteName = 'Migronis Brazil' }: HeaderProps) {
  return (
    <header className="border-b border-neutral-800 bg-black/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">{siteName}</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/#properties" className="text-neutral-400 hover:text-white transition-colors">
            Properties
          </Link>
          <Link href="/#contact" className="text-neutral-400 hover:text-white transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
