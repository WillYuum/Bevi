import app from "../../app.js";
import initCompanyController from "../Controllers/CompaniesController.js";

const initCompaniesRoutes = async () => {
  const controller = await initCompanyController();

  
  app.get("/companies", async (req, res, next) => {
    try {
      let data = await controller.getCompanies();
      res.send({
        success: true,
        Companies: data
      });
    } catch (err) {
      next(err);
    }
  });

};
export default initCompaniesRoutes;
