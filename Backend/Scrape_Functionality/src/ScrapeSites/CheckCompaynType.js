const consideredType = [
    "Information Technology & Services",
    "Computer Software",
    "Program Development",
    "Medical Device",
    "Computer & Network Security",
    "Internet",
    "Telecommunications",
    "Marketing & Advertising"];
const setOfType = new Set(consideredType);

/**
 * @function checkIfCompanyTech check if company is tech company
 * @param {string} recievedType - Type of the Tech company
 * @returns {bool}
 */
export const checkIfCompanyTech = (recievedType) => {
    if (setOfType.has(recievedType)) {
        return true;
    } else {
        return false;
    }
}