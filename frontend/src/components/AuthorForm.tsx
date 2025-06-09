'use client';

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { GET_AUTHORS } from '@/graphql/queries';

export const CREATE_AUTHOR = gql`
  mutation CreateAuthor(
    $name: String!
    $biography: String
    $born_date: String
    $image: String
  ) {
    createAuthor(
      name: $name
      biography: $biography
      born_date: $born_date
      image: $image
    ) {
      id
      name
    }
  }
`;

export default function AuthorForm({ onSuccess }: { onSuccess?: () => void }) {
  const [name, setName] = useState('');
  const [biography, setBiography] = useState('');
  const [bornDate, setBornDate] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [createAuthor, { loading, error }] = useMutation(CREATE_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
    awaitRefetchQueries: true,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageFile) return;
  
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = (reader.result as string).split(',')[1]; // Remove the "data:image/...;base64," prefix
  
      await createAuthor({
        variables: {
          name,
          biography,
          born_date: bornDate || null,
          image: base64String, // send just the base64
        },
      });
  
      setName('');
      setBiography('');
      setBornDate('');
      setImageFile(null);
      setImagePreview(null);
      onSuccess?.();
    };
  
    reader.readAsDataURL(imageFile);
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Add Author</h2>

      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Biography</label>
        <textarea
          value={biography}
          onChange={e => setBiography(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Born Date</label>
        <input
          type="date"
          value={bornDate}
          onChange={e => setBornDate(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>

      <div>
  <label className="block mb-1 font-medium">Author Image</label>
  <div className="relative w-fit">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      id="file-upload"
      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
    />
    <label
      htmlFor="file-upload"
      className="inline-block bg-gray-200 text-sm text-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-300"
    >
      {imageFile ? 'Change Image' : 'Upload Image'}
    </label>
  </div>
  {imagePreview && (
    <img src={imagePreview} alt="Preview" className="mt-3 h-32 rounded border" />
  )}
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
