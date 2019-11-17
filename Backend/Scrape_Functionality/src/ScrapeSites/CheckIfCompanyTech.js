const consideredType = [
    "Information Technology & Services",
    "Computer Software",
    "Program Development",
    "Medical Device",
    "Computer & Network Security",
    "Internet",
    "Computer Games",
    "Electrical & Electronic Manufacturing",
    "Telecommunications",
    "Marketing & Advertising"];
const setOfType = new Set(consideredType);

/**
 * @function checkIfCompanyTech check if company is tech company
 * @param {string} recievedType - Type of the Tech company
 * @returns {bool}
 */
export const checkIfCompanyTech = (recievedType) => {
    console.log("recieved Type",recievedType)
    if (setOfType.has(recievedType.trim())) {
        return true;
    } else {
        return false;
    }
}