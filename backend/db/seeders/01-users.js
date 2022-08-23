'use strict';
require('dotenv').config()

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = require('./data/users.js');
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
