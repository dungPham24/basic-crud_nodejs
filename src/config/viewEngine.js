import express from "express";

const configViewEngine = (app) => {
  //chỉ lấy đường link tĩnh trong public
  app.use(express.static("./src/public"));
  //gõ đc logic trong html
  app.set("view engine", "ejs");
  //set cái đường link trong thu mục views
  app.set("views", "./src/views");
};

module.exports = configViewEngine;
