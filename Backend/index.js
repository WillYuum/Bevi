import app from "./app";
require("dotenv").config();

//-------------- IMPORTED ROUTES-----------------
import initCompaniesRoutes from "./Routes/Companies.js";
//-------------- IMPORTED ROUTES-----------------

// Port to listen on.
console.log("here", app);
app.listen(`${process.env.PORT}`, () => {
  console.log(`listening on ${process.env.PORT}`);
});

initCompaniesRoutes();
