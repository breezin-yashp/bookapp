'use client';

import { notFound } from 'next/navigation';
import { GET_BOOK, GET_REVIEWS } from '@/graphql/queries';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Review = {
  id: number;
  content: string;
  user: string;
  createdAt: string;
};

const CREATE_REVIEW = gql`
  mutation CreateReview($bookId: Int!, $content: String!, $user: String!) {
    createReview(bookId: $bookId, content: $content, user: $user) {
      id
      content
      user
      createdAt
    }
  }
`;

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = parseInt(params.id as string, 10);
  const { data, loading, error } = useQuery(GET_BOOK, { variables: { id: bookId } });
  const { data: reviewsData, refetch: refetchReviews } = useQuery(GET_REVIEWS, { variables: { bookId } });
  const [createReview, { loading: reviewLoading }] = useMutation(CREATE_REVIEW, {
    onCompleted: () => {
      setContent('');
      setUser('');
      refetchReviews();
    }
  });
  const [content, setContent] = useState('');
  const [user, setUser] = useState('');

  if (loading) return <div>Loading...</div>;
  if (error || !data?.book) return notFound();

  const book = data.book;
  const reviews = reviewsData?.reviews || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !user) return;
    await createReview({ variables: { bookId, content, user } });
  };

  return (
<div className="min-h-screen flex items-center justify-center px-4">
    <button
          onClick={() => router.push('/books')}
          className="absolute top-6 left-6 text-white-600 hover:underline"
        >
          ← Back to Books
      </button>
  <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8">
    {/* Left Column */}
    <div className="md:col-span-4 p-4 border rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p className="text-gray-700 mb-4">{book.description}</p>
      {book.published_date && (
        <p className="text-sm text-gray-500 mb-2">
          <span className="font-semibold">Published:</span>{' '}
          {new Date(Number(book.published_date)).toLocaleDateString()}
        </p>
      )}
      {book.author && (
        <p className="text-sm text-gray-500">
          <span className="font-semibold">By:</span> {book.author.name}
        </p>
      )}
    </div>

    {/* Right Column */}
    <div className="md:col-span-8 p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      {reviews.length === 0 && <p className="text-gray-500 mb-4">No reviews yet.</p>}
      <ul className="space-y-4 mb-6">
        {reviews.map((review: Review) => (
          <li key={review.id} className="border-b pb-2">
            <div className="font-semibold">{review.user}</div>
            <div>{review.content}</div>
            <div className="text-xs text-gray-400">
              {new Date(review.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={e => setUser(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        />
        <textarea
          placeholder="Write a review..."
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={reviewLoading}
        >
          {reviewLoading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  </div>
</div>

  );
  
} 