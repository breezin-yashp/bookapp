'use client';

import { useState } from 'react';
import AuthorForm from '@/components/AuthorForm';
import AuthorList from '@/components/AuthorList';
import Navbar from '@/components/Navbar';

export default function AuthorsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
<div className="max-w-3xl mx-auto pt-28 px-4 space-y-8">
      <Navbar />
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Authors</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Author
        </button>
      </div>

      <AuthorList />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="bg-neutral-900 text-white p-6 rounded-lg shadow-2xl w-full max-w-md relative border border-gray-700">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>
            <AuthorForm onSuccess={() => setShowModal(false)} />
          </div>
        </div>
      )}

    </div>
    </div>
  );
}
