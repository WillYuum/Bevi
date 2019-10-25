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

  app.get("/companies/type/:id?", async (req, res, next) => {
    try {
      const typeId = req.params.id;
      const companies = await controller.getCompaniesByTypeId(typeId);
      res.send({
        success: true,
        Type: companies
      });
    } catch (err) {
      next(err);
    }
  });

};
export default initCompaniesRoutes;
