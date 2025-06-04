import AuthorForm from '@/components/AuthorForm';
import AuthorList from '@/components/AuthorList';

export default function AuthorsPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8">
      <AuthorForm />
      <AuthorList />
    </div>
  );
} 