import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import innitWebRouter from "./router/web";
import connectDb from "./config/connectDB";

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
innitWebRouter(app);

connectDb();

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
