'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const reviews = require('./data/reviews.js');
    await queryInterface.bulkInsert('Reviews', await reviews(), {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Reviews', null, {});
  }
};

