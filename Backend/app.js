import express from "express";
import cors from "cors";
import bodyParser from "body-parser"
const app = express();

//---------- Setting up cors-------------------
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});
//---------------------------------------------------


app.use(bodyParser.json())
app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
