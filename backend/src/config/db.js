const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || 'bookapp',
  process.env.POSTGRES_USER || 'yash',
  process.env.POSTGRES_PASSWORD || '',
  {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    dialect: 'postgres',
    logging: false
  }
);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookapp');

module.exports = { sequelize, mongoose }; 