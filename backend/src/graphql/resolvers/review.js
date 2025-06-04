const Review = require('../../models/mongo/review');
const { addReview } = require('../../services/bookService');

const reviewResolvers = {
  Query: {
    reviews: async (_, { bookId }) => {
      return await Review.find({ bookId });
    }
  },
  Mutation: {
    createReview: async (_, { bookId, content, user }) => {
      return await addReview(bookId, content, user);
    }
  },
  Book: {
    reviews: async (book) => {
      return await Review.find({ bookId: book.id });
    }
  },
  Review: {
    createdAt: (review) => review.createdAt
  }
};

module.exports = reviewResolvers; 