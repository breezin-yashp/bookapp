const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db').sequelize;

const Author = sequelize.define('Author', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  biography: {
    type: DataTypes.TEXT
  },
  born_date: {
    type: DataTypes.DATE
  },
  image: {
    type: DataTypes.BLOB('long') 
  }
});

module.exports = Author; 