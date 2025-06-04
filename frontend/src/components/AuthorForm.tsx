'use client';

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { GET_AUTHORS } from '@/graphql/queries';

const CREATE_AUTHOR = gql`
  mutation CreateAuthor($name: String!, $biography: String, $born_date: String) {
    createAuthor(name: $name, biography: $biography, born_date: $born_date) {
      id
      name
      biography
      born_date
    }
  }
`;

export default function AuthorForm() {
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [bornDate, setBornDate] = useState('');
  const [createAuthor, { loading, error }] = useMutation(CREATE_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
    awaitRefetchQueries: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    await createAuthor({ variables: { name, biography, born_date: bornDate || null } });
    setName('');
    setBiography('');
    setBornDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Add Author</h2>
      <div>
        <label htmlFor="author-name" className="block mb-1 font-medium">Name</label>
        <input
          id="author-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="author-biography" className="block mb-1 font-medium">Biography</label>
        <textarea
          id="author-biography"
          value={biography}
          onChange={e => setBiography(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div>
        <label htmlFor="author-born-date" className="block mb-1 font-medium">Born Date</label>
        <input
          id="author-born-date"
          type="date"
          value={bornDate}
          onChange={e => setBornDate(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Author'}
      </button>
      {error && <div className="text-red-600">Error: {error.message}</div>}
    </form>
  );
} 