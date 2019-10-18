import db from "../../db.js";

//This function will initiate the CompanyData controller
const initCompanyController = async () => {
  /**
   * @function getCompanies - controller to get all company data
   * @returns {object} - All company data
   */
  const getCompanies = async () => {
    try {
      const stmt = "SELECT * FROM Companies";
      const data = new Promise((resolve, reject) => {
          db.all(stmt, [], (err, data) => {
            resolve(data);
          });
      });

      return await data;
    } catch (err) {
      throw new Error(`Getting companies failed with = ${err}`);
    }
  };

  // const createCompnay = params => {
  //   if (!params) {
  //     throw new Error("didn't recieve any company data");
  //   }
  // };

  const controller = {
    getCompanies
  };
  return controller;
};
export default initCompanyController;
