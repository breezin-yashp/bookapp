const { Sequelize, DataTypes } = require('sequelize');
const { ApolloServer, gql } = require('apollo-server');
const authorResolvers = require('../author');

const sequelize = new Sequelize('sqlite::memory:', { logging: false });
const Author = sequelize.define('Author', {
  name: { type: DataTypes.STRING, allowNull: false },
  biography: { type: DataTypes.TEXT },
  born_date: { type: DataTypes.DATE }
});

authorResolvers.Author = {
  books: jest.fn().mockResolvedValue([])
};

authorResolvers.Query.authors = async () => await Author.findAll();
authorResolvers.Query.author = async (_, { id }) => await Author.findByPk(id);
authorResolvers.Mutation.createAuthor = async (_, { name, biography, born_date }) => {
  return await Author.create({ name, biography, born_date });
};

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    biography: String
    born_date: String
  }
  type Query {
    authors: [Author]
    author(id: ID!): Author
  }
  type Mutation {
    createAuthor(name: String!, biography: String, born_date: String): Author
  }
`;

describe('Author Resolver', () => {
  let server;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    server = new ApolloServer({
      typeDefs,
      resolvers: {
        Query: authorResolvers.Query,
        Mutation: authorResolvers.Mutation,
        Author: authorResolvers.Author
      },
      context: () => ({})
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('creates an author', async () => {
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
    const res = await server.executeOperation({
      query: CREATE_AUTHOR,
      variables: {
        name: 'Test Author',
        biography: 'Test bio',
        born_date: '2000-01-01'
      }
    });
    expect(res.errors).toBeUndefined();
    expect(res.data.createAuthor.name).toBe('Test Author');
    expect(res.data.createAuthor.biography).toBe('Test bio');
    expect(res.data.createAuthor.born_date).toBe('2000-01-01');
  });
}); 