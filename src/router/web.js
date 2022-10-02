import express from "express";
import homeController from "../controller/homeController";
//dat lich kham benh BE
import userController from "../controller/LoginUser";
import doctorController from "../controller/doctorController";

const router = express.Router();

const innitWebRouter = (app) => {
  //crud nodej
  router.get("/", homeController.getHomePage);

  router.get("/crud", homeController.getCrudPage);

  router.get("/display-crud", homeController.displayCrudPage);

  router.get("/edit-crud?", homeController.editCrudPage);

  router.post("/post-crud", homeController.postCrudPage);

  router.post("/put-crud", homeController.putCrudPage);

  router.get("/delete-crud", homeController.deleteCrudPage);

  //api đặt lịch khám bệnh
  router.post("/api/login", userController.handlerLogin);

  router.get("/api/all/getUser", userController.getAllUserLogin);

  router.post("/api/create/newUser", userController.handlerCreateNewUser);

  router.put("/api/eidt/user", userController.handlerEditUser);

  router.delete("/api/delete/user", userController.handlerDeleteUser);

  router.get("/api/allcode", userController.getAllCode);

  router.get("/api/doctor/top", doctorController.getTopdoctorHome);

  router.get("/api/all/doctors", doctorController.getAlldoctors);

  //lấy hết tất cả các router
  return app.use("/", router);
};

module.exports = innitWebRouter;
