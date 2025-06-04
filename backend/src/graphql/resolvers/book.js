const Book = require('../../models/postgres/book');
const Author = require('../../models/postgres/author');
const { Op } = require('sequelize');

const bookResolvers = {
  Query: {
    books: async (_, { limit, offset, title, authorId }) => {
      const where = {};
      if (title) {
        where.title = {
          [Op.iLike]: `%${title}%`
        };
      }
      if (authorId) {
        where.author_id = authorId;
      }

      return await Book.findAll({
        where,
        limit: limit || undefined,
        offset: offset || undefined,
        include: [Author]
      });
    },
    book: async (_, { id }) => {
      return await Book.findByPk(id, {
        include: [Author]
      });
    }
  },
  Mutation: {
    createBook: async (_, { title, description, published_date, author_id }) => {
      return await Book.create({
        title,
        description,
        published_date,
        author_id
      });
    }
  },
  Book: {
    author: async (book) => {
      return await Author.findByPk(book.author_id);
    }
  }
};

module.exports = bookResolvers; 