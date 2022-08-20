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
module.exports = {
  handlerLogin,
  getAllUserLogin,
};
