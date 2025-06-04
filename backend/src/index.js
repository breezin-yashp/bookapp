const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schema');
const authorResolvers = require('./graphql/resolvers/author');
const bookResolvers = require('./graphql/resolvers/book');
const reviewResolvers = require('./graphql/resolvers/review');
const Author = require('./models/postgres/author');
const Book = require('./models/postgres/book');

Book.belongsTo(Author, { foreignKey: 'author_id' });
Author.hasMany(Book, { foreignKey: 'author_id' });

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      ...authorResolvers.Query,
      ...bookResolvers.Query,
      ...reviewResolvers.Query
    },
    Mutation: {
      ...authorResolvers.Mutation,
      ...bookResolvers.Mutation,
      ...reviewResolvers.Mutation
    },
    Author: {
      ...authorResolvers.Author
    },
    Book: {
      ...bookResolvers.Book,
      ...reviewResolvers.Book
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
}); 