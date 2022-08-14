import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);
import db from "../models/index";

const postCrud = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPasswordFrom = await hashUserPassword(data.password);
      await db.Users.create({
        email: data.email,
        password: hashPasswordFrom,
        firstName: data.firstName,
        lastName: data.lastname,
        gender: data.gender === "0" ? true : false,
      });
      resolve("ok create user to success");
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUerCrud = () => {
  return new Promise((resolve, reject) => {
    try {
      const users = db.Users.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

const getUserByInfo = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.Users.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};
const putCrud = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const id = await db.Users.findOne({
        where: { id: data.id },
      });
      if (id) {
        id.firstName = data.firstName;
        id.lastName = data.lastName;
        id.email = data.email;
        await id.save();
        const allUser = await db.Users.findAll();
        resolve(allUser);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteCrud = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deleteId = await db.Users.findOne({
        Where: { id: id },
      });
      if (deleteCrud) {
        await deleteId.destroy();
        const allUser = await db.Users.findAll();
        resolve(allUser);
      }
    } catch (error) {
      reject(error);
    }
  });
};

//bắm mật khẩu
const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hash = await bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  postCrud,
  getAllUerCrud,
  getUserByInfo,
  putCrud,
  deleteCrud,
};
