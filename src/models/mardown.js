"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mardown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Mardown.belongsTo(models.Mardown,{foreignKey :"doctorId"})
    }
  }
  Mardown.init(
    {
      contentHTML: DataTypes.TEXT("long"),
      contentMardown: DataTypes.TEXT("long"),
      description: DataTypes.TEXT("long"),
      doctorId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Mardown",
    }
  );
  return Mardown;
};
