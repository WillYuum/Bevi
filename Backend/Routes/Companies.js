import app from "../app.js";
import initCompanyController from "../Controllers/CompaniesController.js";

const initCompaniesRoutes = async () => {
  const controller = await initCompanyController();

  app.get("/companies", async (req, res, next) => {
    try {
      const Companies = await controller.getCompanies();
      res.send({
        success: true,
        Companies
      });
    } catch (err) {
      next(err);
    }
  });
};
export default initCompaniesRoutes;
