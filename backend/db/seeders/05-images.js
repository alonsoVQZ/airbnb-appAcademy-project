'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const images = require('./data/images.js');
    await queryInterface.bulkInsert('Images', await images(), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  }
};