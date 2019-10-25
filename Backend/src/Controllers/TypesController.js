import db from "../../db.js";

const initCompanyTypeController = async () => {
  /**
   * @function getCompanyTypes - controller to return all Company types
   * @returns {object} - returs object of company Types
   */
  const getCompanyTypes = async () => {
    try {
      return new Promise((resolve, rejects) => {
        const stmt = "SELECT * FROM Types";
        db.all(stmt, [], (err, result) => {
          if (err) {
            return err;
          }
          resolve(result);
        });
      });
    } catch (err) {
      throw new Error(`Getting company types failed with = ${err}`);
    }
  };

  /**
   * @function - Controller to create a CompanyType
   * @param {string} companyType
   * @returns {object} - return {TypeId, type}
   */
  const createCompanyType = async companyType => {
    try {
      if (!companyType) {
        throw new Error("param in controller is empty");
      }
      const stmt = "INSERT INTO Types (Type) VALUES(?)";
      const promise = new Promise((resolve, rejects) => {
        return db.all(stmt, [companyType], (err, result) => {
          if (err) {
            rejects(new Error(`failed to create company type with = ${err}`));
          }
          resolve(result);
        });
      });
      return await promise;
    } catch (err) {
      throw new Error(`Creating compamny type failed with = ${err}`);
    }
  };

  const controller = {
    getCompanyTypes,
    createCompanyType
  };
  return controller;
};
export default initCompanyTypeController;
