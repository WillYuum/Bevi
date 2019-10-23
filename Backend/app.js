import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
require("dotenv").config();
import path from "path";
const app = express();

//---------- Setting up cors-------------------
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.CORS_ORIGIN}`);
  res.header("Access-Control-Allow-Methods", "GET");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});
//---------------------------------------------------

app.use(bodyParser.json());
app.use(express.static("public"));
console.log(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
