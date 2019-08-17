const Sequelize = require('sequelize');
const db = require('../db');

const Feed = db.define('feed', {
  userUuid: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
});

module.exports = Feed;
