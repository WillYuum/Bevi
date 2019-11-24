import initCompanyTypeController from "../../../src/Controllers/TypesController.js";

/**
 * @function checkIfTypeExist - this function will check if company type exists in database
 * @param {string} companyType - takes company type as input
 * @returns {int} - returns the id of company type from database
 */
const checkIfTypeExist = async companyType => {
  const controller = await initCompanyTypeController();
  const types = await controller.getCompanyTypes();
  const getType = types.find(elem => {
    if (elem.Type === companyType) {
      return elem;
    }
  });

  if (!getType) {
    await controller.createCompanyType(companyType);
    const types = await controller.getCompanyTypes();
    const getType = types.find(elem => {
      if (elem.Type === companyType) {
        return elem;
      }
    });
    return await getType.TypeId;
  } else {
    return await getType.TypeId;
  }
};

export default checkIfTypeExist;
