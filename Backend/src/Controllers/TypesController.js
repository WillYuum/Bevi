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
   * @function getCompanyTypeById - Controller to return a company type with a specific id
   * @param {int} id - Id that represents the Type of company
   * @returns {object} - return {TypeId, Type}
   */
  const getCompanyTypeById = async id => {
    try {
      if (!id) {
        throw new Error("Id is missing");
      }

      const stmt = `SELECT * FROM Types WHERE TypeId = ${id}`;
      return new Promise((resolve, rejects) => {
        db.all(stmt, [], (err, result) => {
          if (err) {
            return err;
          }
          resolve(result);
          db.close();
        });
      });
    } catch (err) {
      throw new Error(`Getting company type by id = ${id} failed with ${err}`);
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
          return resolve(result);
        });
      });
      console.log("the promise", await promise);
      return await promise;
    } catch (err) {
      throw new Error(`Creating compamny type failed with = ${err}`);
    }
  };

  const controller = {
    getCompanyTypes,
    getCompanyTypeById,
    createCompanyType
  };
  return controller;
};
export default initCompanyTypeController;
