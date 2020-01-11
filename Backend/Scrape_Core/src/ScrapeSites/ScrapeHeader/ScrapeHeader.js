import { headerSelectors } from "./HeaderSelector.js"

/**
 * @function ScrapeHeader Srcape the header part of company site
 * @param {class} page - page will provide you with browser and page functions
 * @returns {object} - return {"CompanyLogo", "CompanyName", "CompanyType", "CompanySmallInfo", "CompanyCity"}
 */
export const ScrapeHeader = async page => {
    console.log("scraping header");
    return await page.evaluate(headerSelectors => {
        let header = {
            CompanyName: "",
            CompanySmallInfo: "",
            CompanyType: "",
            CompanyCity: ""
        };
        for (let key in header) {
            const htmlContent = document.querySelector(`${headerSelectors[key]}`);
            if (htmlContent === null) {
                header[key] = "";
            } else {
                header[key] = htmlContent.innerText;
            }
        }
        const { CompanyName, CompanySmallInfo, CompanyType, CompanyCity } = header;
        if (!CompanyName && !CompanySmallInfo && !CompanyType && !CompanyCity) {
            return;
        } else {
            return header;
        }
    }, headerSelectors);
};