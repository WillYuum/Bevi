import {headerSelectors} from "./HeaderSelector.js"

/**
 * @function ScrapeCompanyLogo - saving the company logo in folder
 * @param {class} page
 * @param {string} companyName company name will be added to the directory of company Logo
 */
export const ScrapeCompanyLogo = async (page, companyName) => {
    console.log("Scraping Company Logo");
    const ifLogoExist = await page.evaluate((headerSelectors) => {
        return document.querySelector(`${headerSelectors.CompanyLogo}`);
    }, headerSelectors);
    if (ifLogoExist) {
        const Logo = await page.$(`${headerSelectors.CompanyLogo}`);
        await Logo.screenshot({
            path: "public/companylogos/" + companyName + ".png",
            type: "png",
            omitBackground: true
        });
    } else {
        console.log("there is no logo");
        return;
    }
};