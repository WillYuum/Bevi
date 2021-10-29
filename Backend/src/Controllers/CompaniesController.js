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
   * @function getCompanyTypeById - Controller to return a company type with a specific id
   * @param {int} id - Id that represents the Type of company
   * @returns {object} - return {TypeId, Type}
   */
  const getCompaniesByTypeId = async typeId => {
    try {
      if (!typeId) {
        throw new Error("Id is missing");
      }

      const stmt = `SELECT * FROM Companies JOIN Types ON Companies.CompanytypeId = Types.TypeId WHERE CompanyTypeId = ${typeId}`;
      return new Promise((resolve, rejects) => {
        db.all(stmt, [], (err, result) => {
          if (err) {
            return err;
          }
          resolve(result);
        });
      });
    } catch (err) {
      throw new Error(`Getting company type by id = ${id} failed with ${err}`);
    }
  };

  /**
   * @function getCompanyById
   * @param {int} id company Id
   * @returns {object} return compant data with the specific id
   */
  const getCompanyById = async (id) => {
    try {
      const stmt = `SELECT * FROM Companies JOIN Types ON Companies.CompanytypeId = Types.TypeId WHERE CompanyId = ${id}`;
      return new Promise((resolve, rejects) => {
        db.all(stmt, [], (err, result) => {
          if (err) {
            rejects(err)
          }
          resolve(result)
        })
      })
    } catch (err) {
      throw new Error(`Getting company id = ${id} failed with = ${err}`)
    }
  }

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
        CompanyEmployeeSize,
        ExtraInfo: {
          Founded,
          Specialties }
      } = params.AboutCompany;
      if (!params) {
        throw new Error("didn't recieve any company data");
      }
      //remove the company that doesn't have these info
      if (!CompanyName && !CompanySmallInfo && !CompanyType) {
        return;
      }
      const stmt = `INSERT INTO Companies (CompanyName, CompanySmallInfo,  CompanyTypeId, CompanyWebLink, CompanyDescription, CompanyEmployeeSize, Founded, Specialities) VALUES(?,?,?,?,?,?,?,?)`;
      return new Promise((resolve, rejects) => {
        db.all(
          stmt,
          [
            CompanyName,
            CompanySmallInfo,
            CompanyType,
            CompanyWebLink,
            CompanyDescription,
            CompanyEmployeeSize,
            Founded,
            Specialties,
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

  const getCSVData = async () => {
    try {
      const stmt = `SELECT CompanyName, Type, CompanyWebLink FROM Companies JOIN Types ON Companies.CompanytypeId = Types.TypeId`
      return new Promise((resolve, rejects) => {
        db.all(stmt, [], (err, result) => {
          if (err) {
            rejects(err)
          }
          resolve(result)
        })
      })
    } catch (err) {
      throw new Error(`Fetching csv data failed with ${err}`)
    }
  }

  const controller = {
    getCompanies,
    getCompanyById,
    getCompaniesByTypeId,
    createCompany,
    getCSVData
  };
  return controller;
};
export default initCompanyController;
