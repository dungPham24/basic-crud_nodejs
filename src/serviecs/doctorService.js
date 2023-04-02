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
 
const getInfoDoctors = (inputdata) => {
return new Promise(async (resolve, reject) => {
  try {
    if (!inputdata.doctorId || !inputdata.contentHTML || !inputdata.contentMarkdown) {
      return resolve({
        errCode: 1,
        errMessenger: "missing input data"
      })
    } else {
     await db.Mardown.create({
        contentHTML: inputdata.contentHTML,
        contentMardown: inputdata.contentMarkdown,
        description: inputdata.description,
        doctorId: inputdata.doctorId
      })
      resolve({
        errCode: 0,
        errMessenger: "save info doctor success"
      });
    }
  } catch (error) {
    reject(error)
  }
});
};

const getDetailsDoctor = (id) => {
  return new Promise(async (resolve, reject) => { 
    try {
      if (!id) resolve({ errCode: 1, errMessenger: "missing id" })
      else { 
        const data = await db.Users.findOne({
          where: { id },
           attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Mardown,
            attributes: ['contentHTML', "contentMardown", "description"]
            //trong bang mardowns chi lay 3 truong thoi
          },
           {
            model: db.Allcode,
            as: "positionData",
            attributes: ["value_EN", "value_VI"],
          },
          ],
        //lấy tất cả thông tin từ bảng mardowns
        raw: true,
          nest: true, 
        //nest : cho obj dep hon
        })
        if (data.image && data) {
           data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if(!data) data = {}
        resolve({
                errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error)
    }
  })
}
  
module.exports = {
  getTopDoctor,
  getAlldoctors,
  getInfoDoctors,
  getDetailsDoctor
};
