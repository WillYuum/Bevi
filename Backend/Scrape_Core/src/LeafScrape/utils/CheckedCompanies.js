import fs from "fs-extra";

const filePath = `${__dirname}/CompanyNames.json`;

let CompanyNames = [];

export function CheckIfCompanyWasScraped(companyName) {
    CompanyNames.sort();
    console.time("binary")
    const lastNameInArray = CompanyNames.length - 1;
    const bool = SearchForCompanyName(CompanyNames, 0, lastNameInArray, companyName);
    console.timeEnd("binary");
    return bool
}



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

export async function LoadCompanyNames() {
    if (fs.existsSync(filePath)) {
        CompanyNames = JSON.parse(fs.readFileSync(filePath));
    } else {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
}

export function SaveCheckedCompanyNames() {
    fs.writeFileSync(filePath, JSON.stringify(CompanyNames))
}