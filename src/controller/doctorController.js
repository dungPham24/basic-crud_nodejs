import doctorService from "../serviecs/doctorService";

const getTopdoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    const resultDoctor = await doctorService.getTopDoctor(+limit);
    return res.status(200).json(resultDoctor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessenger: "server Error",
    });
  }
};

const getAlldoctors = async (req, res) => {
  try {
    const doctors = await doctorService.getAlldoctors();
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessenger: "Error from server",
    });
  }
};

module.exports = {
  getTopdoctorHome,
  getAlldoctors,
};
