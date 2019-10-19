import db from "../../db.js";

//This function will initiate the CompanyData controller
const initCompanyController = async () => {
  /**
   * @function getCompanies - controller to get all company data
   * @returns {object} - All company data
   */
  const getCompanies = async () => {
    try {
      const stmt =
        "SELECT * FROM Companies JOIN Types ON Companies.CompanytypeId = Types.TypeId";
      const data = new Promise((resolve, reject) => {
        db.all(stmt, [], (err, data) => {
          resolve(data);
        });
      });
      db.close();
      return await data;
    } catch (err) {
      throw new Error(`Getting companies failed with = ${err}`);
    }
  };

  /**
   * @function createCompany
   * @param {object} params
   */
  const createCompany = async params => {
    try {
      console.log("main data", params.MainData);
      console.log("about data", params.AboutCompany);
      const { CompanyName, CompanySmallInfo, CompanyTypeId } = params.MainData;
      const { CompanyWebLink, CompanyDescription } = params.AboutCompany;
      if (!params) {
        throw new Error("didn't recieve any company data");
      }
      const stmt = `INSERT INTO Companies (CompanyName,CompanySmallInfo,  CompanyTypeId, CompanyWebLink, CompanyDescription) VALUES(?,?,?,?,?)`;
      return new Promise((resolve, rejects) => {
        db.all(
          stmt,
          [
            CompanyName,
            CompanySmallInfo,
            CompanyTypeId,
            CompanyWebLink,
            CompanyDescription
          ],
          (err, result) => {
            if (err) {
              return err;
            }
            resolve(result);
            console.info(`${CompanyName} data is saved in database`);
            db.close()
          }
        );
      });
      
    } catch (err) {
      throw new Error(`creating company faided with = ${err}`);
    }
  };

  const controller = {
    getCompanies,
    createCompany
  };
  return controller;
};
export default initCompanyController;
