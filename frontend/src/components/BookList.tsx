'use client';

import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '@/graphql/queries';
import Link from 'next/link';

type Book = {
  id: string;
  title: string;
  description: string | null;
  published_date: string | null;
  author: {
    id: string;
    name: string;
  } | null;
};

export default function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Books</h2>
      <div className="grid gap-4">
        {data.books.map((book: Book) => (
          <Link
            key={book.id}
            href={`/books/${book.id}`}
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <h3 className="text-lg font-semibold">{book.title}</h3>
            {book.author && (
              <p className="text-gray-600 mt-2">By {book.author.name}</p>
            )}
            {book.published_date && (
              <p className="text-sm text-gray-500 mt-1">
                Published: {new Date(book.published_date).toLocaleDateString()}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
} 