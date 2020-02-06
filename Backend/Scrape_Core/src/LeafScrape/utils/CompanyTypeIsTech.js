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
 * @function CompanyTypeIsTect check if company is tech company
 * @param {string} recievedType - Type of the Tech company
 * @returns {bool}
 */
export default function CompanyTypeIsTech(recievedType) {
    if (!recievedType) {
        console.log("The recieved type is", recievedType)
        return;
    }
    console.log("recieved Type", recievedType)
    if (setOfType.has(recievedType.trim())) {
        return true;
    } else {
        return false;
    }
}