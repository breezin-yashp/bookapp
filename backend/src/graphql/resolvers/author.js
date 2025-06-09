const Author = require('../../models/postgres/author');
const Book = require('../../models/postgres/book');
const { Op } = require('sequelize');

const authorResolvers = {
  Query: {
    authors: async (_, { limit, offset, name, born_date }) => {
      const where = {};
      if (name) {
        where.name = {
          [Op.iLike]: `%${name}%`
        };
      }
      if (born_date) {
        where.born_date = born_date;
      }

      return await Author.findAll({
        where,
        limit: limit || undefined,
        offset: offset || undefined
      });
    },
    author: async (_, { id }) => {
      return await Author.findByPk(id);
    }
  },
  Mutation: {
    createAuthor: async (_, { name, biography, born_date, image }) => {
      let imageBuffer = null;
  
      if (image) {
        try {
          imageBuffer = Buffer.from(image, 'base64');
        } catch (err) {
          throw new Error('Failed to decode base64 image');
        }
      }
  
      return await Author.create({
        name,
        biography,
        born_date,
        image: imageBuffer,
      });
    }
  },
  Author: {
    books: async (author) => {
      return await Book.findAll({ where: { author_id: author.id } });
    },
    image: (author) => {
      if (!author.image) return null;
      return `data:image/jpeg;base64,${author.image.toString('base64')}`;
    }
  }
};

module.exports = authorResolvers; 