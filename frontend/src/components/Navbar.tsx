'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;


  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md text-white shadow-lg px-4 py-2 rounded-full border border-white/10">
      <div className="flex space-x-4">
      <Link
        href="/"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          isActive('/')
            ? 'bg-black text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        Home
      </Link>
      <Link
        href="/authors"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          isActive('/authors')
            ? 'bg-black text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        Authors
      </Link>
      <Link
        href="/books"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          isActive('/books')
            ? 'bg-black text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        Books
      </Link>
      </div>
    </nav>
  );
}
