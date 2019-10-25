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
      const { CompanyName, CompanySmallInfo, CompanyType } = params.MainData;
      const {
        CompanyWebLink,
        CompanyDescription,
        CompanyEmployeeSize
      } = params.AboutCompany;
      if (!CompanyName && !CompanySmallInfo && !CompanyType) {
        return;
      }
      console.group(CompanyType);
      if (!params) {
        throw new Error("didn't recieve any company data");
      }
      const stmt = `INSERT INTO Companies (CompanyName, CompanySmallInfo,  CompanyTypeId, CompanyWebLink, CompanyDescription, CompanyEmployeeSize) VALUES(?,?,?,?,?,?)`;
      return new Promise((resolve, rejects) => {
        db.all(
          stmt,
          [
            CompanyName,
            CompanySmallInfo,
            CompanyType,
            CompanyWebLink,
            CompanyDescription,
            CompanyEmployeeSize
          ],
          (err, result) => {
            if (err) {
              return err;
            }
            resolve(result);
            console.info(`${CompanyName} data is saved in database`);
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
