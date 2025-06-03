const { gql } = require('apollo-server');

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    biography: String
    born_date: String
    books: [Book]
  }

  type Book {
    id: ID!
    title: String!
    description: String
    published_date: String
    author: Author
  }

  type Query {
    authors: [Author]
    author(id: ID!): Author
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    createAuthor(name: String!, biography: String, born_date: String): Author
    createBook(title: String!, description: String, published_date: String, author_id: ID!): Book
  }
`;

module.exports = typeDefs; 