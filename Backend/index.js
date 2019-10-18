import app from "./app";
require("dotenv").config();

//-------------- IMPORTED ROUTES-----------------
import initCompaniesRoutes from "./src/Routes/Companies.js";
import initCompanyTypeRoutes from "./src/Routes/CompanyTypes.js"
//-------------- IMPORTED ROUTES-----------------

const Main = async () => {
  // Port to listen on.
  app.listen(`${process.env.PORT}`, () => {
    console.log(`listening on ${process.env.PORT}`);
  });

  await initCompaniesRoutes();
  await initCompanyTypeRoutes()
};

Main()