const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || 'bookapp',
  process.env.POSTGRES_USER || 'postgres',
  process.env.POSTGRES_PASSWORD || 'postgres',
  {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    dialect: 'postgres',
    logging: false
  }
);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookapp');

const Author = require('../models/postgres/author');
const Book = require('../models/postgres/book');

Book.belongsTo(Author, { foreignKey: 'author_id' });
Author.hasMany(Book, { foreignKey: 'author_id' });

module.exports = { sequelize, mongoose, Author, Book }; 