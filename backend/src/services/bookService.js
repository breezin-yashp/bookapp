const Review = require('../models/mongo/review');

async function addReview(bookId, content, user) {
  return await Review.create({
    bookId,
    content,
    user,
    createdAt: new Date().toISOString()
  });
}

module.exports = { addReview }; 