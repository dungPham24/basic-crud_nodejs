import db from "../models/index";
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);

//handerLogin
const handlerUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let usersData = {};
      const isExist = await checkUserEmail(email);
      if (isExist) {
        const user = await db.Users.findOne({
          where: { email: email },
          raw: true,
          //lay 3 truong thoi
          attributes: ["email", "password", "roleId", "firstName", "lastName"],
        });
        if (user) {
          //bam password
          const checkpassword = await bcrypt.compareSync(
            password,
            user.password
          );
          if (checkpassword) {
            usersData.errCode = 0;
            usersData.errmessenger = "ok";
            delete user.password;
            usersData.user = user;
          } else {
            usersData.errCode = 3;
            usersData.errMessenger = "wrong password";
          }
        } else {
          usersData.errCode = 2;
          usersData.errMessenger = `user not exit`;
        }
      } else {
        usersData.errCode = 1;
        usersData.errmessenger = `your email isn't exits in your system.plz try other`;
      }
      resolve(usersData);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "All") {
        users = await db.Users.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "All") {
        users = await db.Users.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }

      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

const createNewUer = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email) {
        resolve({
          errCode: 3,
          messenger: "vui long nhap mail",
        });
      }
      const checkEmail = await checkUserEmail(data.email);
      if (checkEmail) {
        resolve({
          errCode: 1,
          messenger: "email not exits ,plz thu lai",
        });
      } else {
        const hashPassword = await hashUserPassword(data.password);

        await db.Users.create({
          address: data.address,
          email: data.email,
          firstName: data.firstName,
          gender: data.gender,
          lastName: data.lastName,
          password: hashPassword,
          phonenumber: data.phonenumber,
          positionId: data.positionId,
          roleId: data.roleId,

          image: data.image,
        });

        resolve({
          errCode: 0,
          messenger: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    const user = await db.Users.findOne({
      where: { id: userId },
    });
    if (!user) {
      resolve({
        errCode: 3,
        errMessenger: "the user not't exist",
      });
    }

    if (user) {
      await db.Users.destroy({
        where: { id: userId },
      });
      resolve({
        errCode: 0,
        messenger: "the user is deleted",
      });
    }
  });
};
const editUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 3,
          errMessenger: "required id ",
        });
      }
      const user = await db.Users.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.fistname = data.fistname;
        user.lastname = data.lastname;
        user.email = data.email;

        await user.save();

        resolve({
          errCode: 0,
          messenger: "user done update",
        });
      } else {
        resolve({
          errCode: 1,
          messenger: "user not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllcodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeInput) {
        let res = {};
        const allCode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allCode;
        resolve(res);
      } else {
        resolve({
          errCode: 3,
          errMessenger: "missing to paramater!!!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

//hashPassword
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

//checkemail
const checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.Users.findOne({
        where: { email: email },
      });
      if (user) resolve(user);
      else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handlerUserLogin,
  getAllUser,
  createNewUer,
  deleteUser,
  editUser,
  getAllcodeService,
};
