import app from "../../app.js";
import initCompanyTypeController from "../Controllers/TypesController.js";

const initCompanyTypeRoutes = async () => {
  const controller = await initCompanyTypeController();

  app.get("/bevi.api/companies/types", async (req, res, next) => {
    try {
      let types = await controller.getCompanyTypes();

      res.send({
        success: true,
        CompanyTypes: types
      });
    } catch (err) {
      next(err);
    }
  });
};
export default initCompanyTypeRoutes;
