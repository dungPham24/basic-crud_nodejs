"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("mardown", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contentHTML: {
        allowNull: false, //k cho no null
        type: Sequelize.TEXT("long"),
      },
      contentMardown: {
        allowNull: false, //k cho no null
        type: Sequelize.TEXT("long"),
      },
      description: {
        allowNull: true, // co the cho no null
        type: Sequelize.TEXT("long"),
      },
      doctorId: {
        allowNull: true, // co the cho no null
        type: Sequelize.INTEGER,
      },
      clinicId: {
        allowNull: false, // k cho no null
        type: Sequelize.INTEGER,
      },
      specialtyId: {
        allowNull: false, //k cho no nullallowNull: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("mardown");
  },
};
