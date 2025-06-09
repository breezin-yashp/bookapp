'use client';

import { useState } from 'react';
import BookForm from '@/components/BookForm';
import BookList from '@/components/BookList';
import Navbar from '@/components/Navbar';

export default function BooksPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-3xl mx-auto pt-28 px-4 space-y-8">
      <Navbar />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Books</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </div>

      <BookList />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-neutral-900 text-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <BookForm onSuccess={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
