import BookForm from '@/components/BookForm';
import BookList from '@/components/BookList';

export default function BooksPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8">
      <BookForm />
      <BookList />
    </div>
  );
} 