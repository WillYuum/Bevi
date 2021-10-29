import app from "../../app.js";
import initCompanyController from "../Controllers/CompaniesController.js";

const stringify = require('csv-stringify');

const initCompaniesRoutes = async () => {
  const controller = await initCompanyController();


  app.get("/bevi.api/companies", async (req, res, next) => {
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

  app.get("/bevi.api/company/:id", async (req, res, next) => {
    try {
      const companyId = req.params.id;
      const data = await controller.getCompanyById(companyId)
      res.send({
        success: true,
        Company: data
      })
    } catch (err) {
      next(err)
    }
  })

  app.get("/bevi.api/companies/type/:id", async (req, res, next) => {
    try {
      const typeId = req.params.id;
      const companies = await controller.getCompaniesByTypeId(typeId);
      res.send({
        success: true,
        Companies: companies
      });
    } catch (err) {
      next(err);
    }
  });


  app.get("/bevi.api/companies/download-csv", async (req, res, next) => {
    try {
      let date = new Date()
      let downloadDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'Companies-' + downloadDate + '.csv\"');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Pragma', 'no-cache');

      const data = await controller.getCSVData();

      stringify(data, { header: true })
        .pipe(res)
    } catch (err) {
      next(err)
    }
  })

};
export default initCompaniesRoutes;
