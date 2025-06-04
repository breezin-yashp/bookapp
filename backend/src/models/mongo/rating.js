const mongoose = require('mongoose');
const { mongoose: db } = require('../../config/db');

const ratingSchema = new mongoose.Schema({
  bookId: {
    type: Number,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  createdAt: {
    type: String, // Store as ISO string
    required: true
  }
});

module.exports = db.model('Rating', ratingSchema); 