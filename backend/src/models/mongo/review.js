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
    type: Date,
    default: Date.now
  }
});

module.exports = db.model('Review', reviewSchema); 