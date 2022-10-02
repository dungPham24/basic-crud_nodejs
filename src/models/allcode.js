"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //Mối quan hệ
    static associate(models) {
      // define association here
      Allcode.hasMany(models.Users, {
        foreignKey: "positionId",
        as: "positionData",
      });
      Allcode.hasMany(models.Users, { foreignKey: "gender", as: "genderData" });
    }
  }
  Allcode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      value_EN: DataTypes.STRING,
      value_VI: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
