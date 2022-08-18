'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users'
          },
          key: 'id'
        },
        onDelete: 'cascade'
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(32)
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(4)
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING(16)
      },
      lat: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 7)
      },
      lng: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 7)
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(512)
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Spots');
  }
};