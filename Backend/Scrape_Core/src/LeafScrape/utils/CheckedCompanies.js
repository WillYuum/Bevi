import fs from "fs-extra";

const filePath = `${__dirname}/CompanyNames.json`;

//here I'll store the occured company names
let CompanyNames = [];

/**
 *
 * @export CheckIfCompanyWasScraped - method that will check if I already passed through company name
 * so it doesn't have to go to the stack and search it's inner related companies
 * @param {string} companyName
 * @returns {boolean} 
 */
export function CheckIfCompanyWasScraped(companyName) {
    CompanyNames.sort();
    console.time("binary")
    const lastNameInArray = CompanyNames.length - 1;
    const bool = SearchForCompanyName(CompanyNames, 0, lastNameInArray, companyName);
    console.timeEnd("binary");
    return bool
}


//using binary search to search for company name
function SearchForCompanyName(arr, left = 0, right, pickedName) {
    if (CompanyNames.length === 0) {
        CompanyNames.push(pickedName);
        return;
    }


    if (right >= left) {
        let midArr = Math.floor(left + (right - left) / 2);

        if (arr[midArr] === pickedName) {
            return true;
        } else if (arr[midArr] > pickedName) {
            return SearchForCompanyName(arr, left, midArr - 1, pickedName);
        } else {
            return SearchForCompanyName(arr, midArr + 1, right, pickedName);
        }
    } else {
        CompanyNames.push(pickedName);
        return false;
    }
}

/**
 *
 * @export LoadCompanyNames - loads the previous company names
 * that the program passed through
 */
export async function LoadCompanyNames() {
    if (fs.existsSync(filePath)) {
        CompanyNames = JSON.parse(fs.readFileSync(filePath));
    } else {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
}

/**
 * @export SaveCheckedCompanyNames - saving the updated array 
 * that has the new company occured names
 */
export function SaveCheckedCompanyNames() {
    fs.writeFileSync(filePath, JSON.stringify(CompanyNames))
}