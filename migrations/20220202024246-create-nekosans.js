'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Nekosan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      food: {
        type: Sequelize.STRING
      },
      personality: {
        type: Sequelize.STRING
      },
      favoriteToys: {
        type: Sequelize.STRING
      },
      favoriteSnack: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Nekosan');
  }
};