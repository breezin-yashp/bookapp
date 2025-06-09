'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_AUTHOR } from '@/graphql/queries';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data, loading, error } = useQuery(GET_AUTHOR, {
    variables: { id },
  });

  if (loading) return <div>Loading...</div>;
  if (error || !data?.author) return <div>Author not found</div>;

  const author = data.author;

  return (
    <div className="flex items-center justify-center min-h-screen px-4 relative">
      <button
        onClick={() => router.push('/authors')}
        className="absolute top-4 left-4 text-sm px-3 py-1 rounded text-white-600 hover:underline"
      >
        ← Back to Authors
      </button>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 border rounded-lg p-4 flex items-center justify-center">
          {author.image ? (
            <Image
              src={author.image}
              alt={author.name}
              width={400}
              height={320}
              unoptimized
              className="rounded-lg object-cover max-h-80 w-full"
            />
          ) : (
            <div className="text-gray-500 text-center">No image available</div>
          )}
        </div>

        <div className="md:col-span-2 border rounded-lg p-4">
          <h1 className="text-2xl font-bold mb-2">{author.name}</h1>
          {author.biography && (
            <p className="text-gray-700 mb-2">{author.biography}</p>
          )}
          {author.born_date && (
            <p className="text-sm text-gray-500 mb-4">
              Born: {new Date(Number(author.born_date)).toLocaleDateString()}
            </p>
          )}

          <h2 className="text-xl font-bold mb-2">Books by {author.name}</h2>
          {author.books?.length === 0 ? (
            <p className="text-gray-500">No books found.</p>
          ) : (
            <ul className="grid gap-4">
              {author.books.map((book: { id: string; title: string }) => (
                <li key={book.id}>
                  <Link
                    href={`/books/${book.id}`}
                    className="block border rounded-lg p-4 hover:bg-blue-50 transition-all"
                  >
                    <h3 className="text-lg font-semibold text-white-700 hover:text-black transition-colors">
                      {book.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
