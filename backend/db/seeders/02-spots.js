'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const spots = require('./data/spots.js');
    await queryInterface.bulkInsert('Spots', await spots(), {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {});
  }
};