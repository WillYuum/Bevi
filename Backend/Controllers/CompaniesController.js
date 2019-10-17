import db from "../db.js";

//This function will initiate the CompanyData controller
const initCompanyController = async () => {
  /**
   * @function getCompanies - controller to get all company data
   * @returns {object} - All company data
   */
  const getCompanies = () => {
    try {
      const stmt = `SELECT * from Company`;
      db.all(stmt, [], (err, data) => {
        if (err) {
          throw new Error(`getting companies failed with = ${err}`);
        }
      });
    } catch (err) {
      throw new Error(`Getting companies failed with = ${err}`);
    }
  };

  
  const createCompnay = params => {
    if (!params) {
      throw new Error("didn't recieve any company data");
    }
  };

  const controller = {
    getCompanies,
    createCompnay
  };
  return controller;
};
export default initCompanyController;
