import db from "../models/index";
import bcrypt from "bcrypt";
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
          attributes: ["email", "password", "roleId"],
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

module.exports = {
  handlerUserLogin,
  getAllUser,
};
