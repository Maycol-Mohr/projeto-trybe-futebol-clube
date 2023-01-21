"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const TeamsTable = queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      team_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    })
    return TeamsTable;
  },

  down: async (queryInterface) => await queryInterface.dropTable('teams'),
};
