import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookList from '../BookList';
import { MockedProvider } from '@apollo/client/testing';
import { GET_BOOKS } from '@/graphql/queries';

const mocks = [
  {
    request: {
      query: GET_BOOKS,
      variables: {}
    },
    result: {
      data: {
        books: [
          {
            id: '1',
            title: 'Book One',
            description: 'Desc 1',
            published_date: '2020-01-01',
            author: { id: 'a1', name: 'Author One' }
          },
          {
            id: '2',
            title: 'Book Two',
            description: 'Desc 2',
            published_date: '2021-01-01',
            author: { id: 'a2', name: 'Author Two' }
          }
        ]
      }
    }
  }
];

test('renders a list of books', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BookList />
    </MockedProvider>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  expect(await screen.findByText('Book One')).toBeInTheDocument();
  expect(await screen.findByText('Book Two')).toBeInTheDocument();
  
  expect(await screen.findByText('By Author One')).toBeInTheDocument();
  expect(await screen.findByText('By Author Two')).toBeInTheDocument();
}); 