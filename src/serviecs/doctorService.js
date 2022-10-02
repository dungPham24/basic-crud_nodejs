import db from "../models/index";

const getTopDoctor = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.Users.findAll({
        limit: limitInput,
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["value_EN", "value_VI"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["value_EN", "value_VI"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAlldoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const doctors = await db.Users.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["image", "password"],
        },
      });
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getTopDoctor,
  getAlldoctors,
};
