'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-10">
      <div className="text-center">
        <h2 className="text-xl text-gray-600 mb-2">Welcome to</h2>
        <h1 className="text-5xl font-bold text-white mb-15">The BookApp</h1>
        <h3 className="text-lg text-gray-500">Where do you wanna go?</h3>
      </div>

      <div className="flex gap-6">
      <Link
          href="/authors"
          className="px-6 py-3 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          Authors
        </Link>
        <Link
          href="/books"
          className="px-6 py-3 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          Books
        </Link>
      </div>
    </div>
  );
}
