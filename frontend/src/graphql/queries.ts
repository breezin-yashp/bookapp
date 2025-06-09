import { gql } from '@apollo/client';

export const GET_AUTHORS = gql`
  query GetAuthors($limit: Int, $offset: Int, $name: String) {
    authors(limit: $limit, offset: $offset, name: $name) {
      id
      name
      biography
      born_date
      image
    }
  }
`;

export const GET_AUTHOR = gql`
  query GetAuthor($id: ID!) {
    author(id: $id) {
      id
      name
      biography
      born_date
      image
      books {
        id
        title
        description
        published_date
      }
    }
  }
`;


export const GET_BOOKS = gql`
  query GetBooks($limit: Int, $offset: Int, $title: String, $authorId: ID) {
    books(limit: $limit, offset: $offset, title: $title, authorId: $authorId) {
      id
      title
      description
      published_date
      author {
        id
        name
      }
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      description
      published_date
      author {
        id
        name
        biography
        born_date
      }
    }
  }
`;

export const GET_REVIEWS = gql`
  query GetReviews($bookId: Int!) {
    reviews(bookId: $bookId) {
      id
      bookId
      content
      user
      createdAt
    }
  }
`; 