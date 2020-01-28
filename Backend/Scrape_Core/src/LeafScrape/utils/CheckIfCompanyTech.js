const consideredType = [
    "Information Technology & Services",
    "Computer Software",
    "Program Development",
    "Medical Device",
    "Computer & Network Security",
    "Internet",
    "Computer Games",
    "Electrical & Electronic Manufacturing",
    "Telecommunications"];
const setOfType = new Set(consideredType);

/**
 * @function CheckIfCompanyTech check if company is tech company
 * @param {string} recievedType - Type of the Tech company
 * @returns {bool}
 */
export function CheckIfCompanyTech(recievedType){
    console.log("recieved Type", recievedType)
    if (setOfType.has(recievedType.trim())) {
        return true;
    } else {
        return false;
    }
}