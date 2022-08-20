import e from "express";
import db from "../models/index";
import CreateUser from "../serviecs/curd-postCrud";

const getHomePage = async (req, res) => {
  try {
    const data = await db.Users.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

const getCrudPage = async (req, res) => {
  await res.render("getCrud.ejs");
};

const postCrudPage = async (req, res) => {
  const data = await CreateUser.postCrud(req.body);
  return res.send("/hêlo");
};

const displayCrudPage = async (req, res) => {
  const data = await CreateUser.getAllUerCrud();
  return res.render("displayCrud.ejs", {
    data,
  });
};

const editCrudPage = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    const data = await CreateUser.getUserByInfo(userId);

    return res.render("editCrud.ejs", {
      data,
    });
  } else {
    return res.send("user note found");
  }
};

const putCrudPage = async (req, res) => {
  const dataPut = req.body;
  const allUser = await CreateUser.putCrud(dataPut);
  console.log(allUser);
  return res.render("displayCrud.ejs", {
    data: allUser,
  });
};

const deleteCrudPage = async (req, res) => {
  const idDelete = req.query.id;

  if (idDelete) {
    const dataUser = await CreateUser.deleteCrud(idDelete);
    return res.render("displayCrud.ejs", {
      data: dataUser,
    });
  } else {
    return res.send("user note found");
  }
};

const getLoginPage = async (req, res) => {
  return res.send("heelo window");
};
module.exports = {
  getHomePage,
  getCrudPage,
  postCrudPage,
  displayCrudPage,
  editCrudPage,
  putCrudPage,
  deleteCrudPage,
  getLoginPage,
};
