"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("mardowns", {
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
        allowNull: true, 
        type: Sequelize.INTEGER,
      },
      clinicId: {
        allowNull: true, 
        type: Sequelize.INTEGER,
      },
      specialtyId: {
        allowNull: true, 
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
    await queryInterface.dropTable("mardowns");
  },
};
