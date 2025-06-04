const mongoose = require('mongoose');
const { mongoose: db } = require('../../config/db');

const reviewSchema = new mongoose.Schema({
  bookId: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
});

module.exports = db.model('Review', reviewSchema); 