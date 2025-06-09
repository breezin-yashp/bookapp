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
      <div className="grid gap-4">
        {data.authors.map((author: Author) => (
          <Link 
            key={author.id} 
            href={`/authors/${author.id}`}
            className="group p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-lg font-semibold group-hover:text-black transition-colors">
              {author.name}
            </h3>
            {author.biography && (
              <p className="text-gray-600 mt-2 group-hover:text-black transition-colors">
                {author.biography}
              </p>
            )}
            {author.born_date && (
              <p className="text-sm text-gray-500 mt-1 group-hover:text-black transition-colors">
                Born: {new Date(Number(author.born_date)).toLocaleDateString()}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
