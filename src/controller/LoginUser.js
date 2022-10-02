import userServiece from "../serviecs/userService";

const handlerLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      messenger: "Missing inputs parameter",
    });
  }

  const userData = await userServiece.handlerUserLogin(email, password);

  return res.status(200).json({
    errorCode: userData.errCode,
    errMessenger: userData.errmessenger,
    user: userData.user ? userData.user : {},
  });
};

export const getAllUserLogin = async (req, res) => {
  const id = req.query.id;

  const allUser = await userServiece.getAllUser(id);

  return res.status(200).json({
    errCode: 0,
    errMessenger: "Ok",
    allUser,
  });
};

const handlerCreateNewUser = async (req, res) => {
  const messenger = await userServiece.createNewUer(req.body);
  return res.status(200).json(messenger);
};

const handlerDeleteUser = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({
      errCode: 1,
      errMessenger: "missing required id!!",
    });
  }
  const messenger = await userServiece.deleteUser(req.body.id);
  return res.status(200).json(messenger);
};

const handlerEditUser = async (req, res) => {
  const messenger = await userServiece.editUser(req.body);
  return res.status(200).json(messenger);
};

const getAllCode = async (req, res) => {
  try {
    const data = await userServiece.getAllcodeService(req.query.type);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.log("get user", error);
    return res.status(400).json({
      errCode: 3,
      errMessenger: "Err form server",
    });
  }
};
module.exports = {
  handlerLogin,
  getAllUserLogin,
  handlerCreateNewUser,
  handlerEditUser,
  handlerDeleteUser,
  getAllCode,
};
