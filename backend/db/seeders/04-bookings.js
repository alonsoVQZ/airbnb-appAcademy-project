'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const bookings = require('./data/bookings.js');
    await queryInterface.bulkInsert('Bookings', await bookings(), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};