'use client';

import { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { GET_AUTHORS, GET_BOOKS, GET_AUTHOR } from '@/graphql/queries';

const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $description: String, $published_date: String, $author_id: ID!) {
    createBook(title: $title, description: $description, published_date: $published_date, author_id: $author_id) {
      id
      title
      description
      published_date
      author {
        id
        name
      }
    }
  }
`;


export default function BookForm({ onSuccess }: { onSuccess?: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [authorId, setAuthorId] = useState('');
  const { data: authorsData, loading: authorsLoading } = useQuery(GET_AUTHORS);
  const [createBook, { loading, error }] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: GET_BOOKS },
      { query: GET_AUTHOR, variables: { id: authorId } }
    ],
    awaitRefetchQueries: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !authorId) return;
    await createBook({ variables: { title, description, published_date: publishedDate || null, author_id: authorId } });
    setTitle('');
    setDescription('');
    setPublishedDate('');
    setAuthorId('');
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Add Book</h2>

      <div>
        <label htmlFor="book-title" className="block mb-1 font-medium">Title</label>
        <input
          id="book-title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>

      <div>
        <label htmlFor="book-description" className="block mb-1 font-medium">Description</label>
        <textarea
          id="book-description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div>
        <label htmlFor="book-published-date" className="block mb-1 font-medium">Published Date</label>
        <input
          id="book-published-date"
          type="date"
          value={publishedDate}
          onChange={e => setPublishedDate(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Author</label>
        <select
          value={authorId}
          onChange={e => setAuthorId(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
          disabled={authorsLoading}
        >
          <option value="">Select an author</option>
          {authorsData?.authors.map((author: { id: string; name: string }) => (
            <option key={author.id} value={author.id}>{author.name}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Book'}
      </button>

      {error && <div className="text-red-600">Error: {error.message}</div>}
    </form>
  );
}
