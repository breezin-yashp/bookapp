'use client';

import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from '@/graphql/queries';
import Link from 'next/link';

type Author = {
  id: string;
  name: string;
  biography: string | null;
  born_date: string | null;
};

export default function AuthorList() {
  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Authors</h2>
      <div className="grid gap-4">
        {data.authors.map((author: Author) => (
          <Link 
            key={author.id} 
            href={`/authors/${author.id}`}
            className="p-4 border rounded-lg hover:bg-gray-50"
          >
            <h3 className="text-lg font-semibold">{author.name}</h3>
            {author.biography && (
              <p className="text-gray-600 mt-2">{author.biography}</p>
            )}
            {author.born_date && (
              <p className="text-sm text-gray-500 mt-1">
                Born: {new Date(author.born_date).toLocaleDateString()}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
} 