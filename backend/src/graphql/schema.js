const { gql } = require('apollo-server');

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    biography: String
    born_date: String
    image: String
    books: [Book]
  }

  type Book {
    id: ID!
    title: String!
    description: String
    published_date: String
    author: Author
    reviews: [Review]
  }

  type Review {
    id: ID!
    bookId: Int!
    content: String!
    user: String!
    createdAt: String!
  }

  type Query {
    authors(limit: Int, offset: Int, name: String, born_date: String): [Author]
    author(id: ID!): Author
    books(limit: Int, offset: Int, title: String, authorId: ID): [Book]
    book(id: ID!): Book
    reviews(bookId: Int!): [Review]
  }

  type Mutation {
    createAuthor(name: String!, biography: String, born_date: String, image: String): Author
    createBook(title: String!, description: String, published_date: String, author_id: ID!): Book
    createReview(bookId: Int!, content: String!, user: String!): Review
  }
`;

module.exports = typeDefs; 