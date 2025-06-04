import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthorForm from '../AuthorForm';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import { GET_AUTHORS } from '@/graphql/queries';

const CREATE_AUTHOR = gql`
  mutation CreateAuthor($name: String!, $biography: String, $born_date: String) {
    createAuthor(name: $name, biography: $biography, born_date: $born_date) {
      id
      name
      biography
      born_date
    }
  }
`;

const mocks = [
  {
    request: {
      query: CREATE_AUTHOR,
      variables: {
        name: 'Test Author',
        biography: 'Test Bio',
        born_date: '2000-01-01'
      }
    },
    result: {
      data: {
        createAuthor: {
          id: '1',
          name: 'Test Author',
          biography: 'Test Bio',
          born_date: '2000-01-01'
        }
      }
    }
  },
  {
    request: {
      query: GET_AUTHORS,
      variables: {}
    },
    result: {
      data: {
        authors: [
          {
            id: '1',
            name: 'Test Author',
            biography: 'Test Bio',
            born_date: '2000-01-01'
          }
        ]
      }
    }
  }
];

test('submits the form and calls the mutation', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AuthorForm />
    </MockedProvider>
  );

  const nameInput = screen.getByLabelText('Name');
  const biographyInput = screen.getByLabelText('Biography');
  const bornDateInput = screen.getByLabelText('Born Date');

  fireEvent.change(nameInput, { target: { value: 'Test Author' } });
  fireEvent.change(biographyInput, { target: { value: 'Test Bio' } });
  fireEvent.change(bornDateInput, { target: { value: '2000-01-01' } });

  fireEvent.click(screen.getByRole('button', { name: /add author/i }));

  await waitFor(() => {
    expect(nameInput).toHaveValue('');
    expect(biographyInput).toHaveValue('');
    expect(bornDateInput).toHaveValue('');
  });
}); 