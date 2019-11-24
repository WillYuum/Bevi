import { scrapeExtraInfo } from "./ScrapeExtraInfo.js.js";
import { aboutSelector } from "./AboutUsSelectors.js.js"

/**
 *@function ScrapeAboutUs - Scrapes the about us section in company Site
 * @param {class} page - page will provide you with browser and page functions
 * @param {string} url - The company site url
 * @return {object} - this is about us info for company site
 */
export const ScrapeAboutUs = async (page, url) => {
    const AboutUsUrl = `${url}about/`;
    await page.goto(AboutUsUrl);
    console.log("we are in", AboutUsUrl);

    const aboutData = await page.evaluate(aboutSelector => {
        const aboutData = {
            CompanyWebLink: "",
            CompanyDescription: "",
            CompanyEmployeeSize: ""
        };

        for (let key in aboutData) {
            const htmlContent = document.querySelector(`${aboutSelector[key]}`);
            if (htmlContent === null) {
                aboutData[key] = "";
            } else {
                aboutData[key] = htmlContent.innerText;
            }
        }

        return aboutData;
    }, aboutSelector);


    const receivedExtraInfo = await scrapeExtraInfo(page);

    //adding extra info to the company about data
    aboutData["ExtraInfo"] = receivedExtraInfo;
    return aboutData
};