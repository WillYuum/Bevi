import express from "express";
import cors from "cors";

const sqlite3 = require("sqlite3").verbose();
//! add the sqlite dataBase file
let db = new sqlite3.Database("./DataBase/", err => {
  if (err) {
    throw new Error(`getting the database file failed with = ${err.message}`);
  }
  console.log("Connect to Sqlite DataBase");
});

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.BACKEND_HOST);
  res.header("Access-Control-Allow-Methods", "GET");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default { app, db };
