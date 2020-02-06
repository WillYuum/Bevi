import loginToLinkinedin from "../Activation_Functions/loginFunc.js";
import { closeBrowser } from "../Activation_Functions/broswerFunc.js";
import { similarPagesSelectors } from "./SimilarPagesSelector.js";
import { CompanyTypeIsTech } from "./utils/CompanyTypeIsTech";
import { CheckIfCompanyWasScraped, LoadCompanyNames, SaveCheckedCompanyNames } from "./utils/CheckedCompanies.js";

const BaseSeed = [
    "https://www.linkedin.com/company/groovy-antoid/",
]

let CompaniesStack = [];

async function LeafScrape() {
    // LoadCompanyNames();
    try {



        const page = await loginToLinkinedin("https://www.linkedin.com/login");

        for (let i = 0; i < BaseSeed.length; i++) {
            await page.goto(BaseSeed[i]);

            //getting the data from similar page card
            let CompanyData = await ScrapeCompanyMainData({ similarPagesSelectors, page });

            for (let index = 0; index < CompanyData.length; index++) {
                const company = CompanyData[index];
                //checking if the company have been searched from before
                if (CheckIfCompanyWasScraped(company.CompanyName)) {
                    CompaniesStack.push(company)
                    console.log(`${company.CompanyName} was not scraped`);
                } else {
                    console.log(`${company.CompanyName} was scraped`);
                }

            }
        }

        console.log(CompaniesStack)
        //saving company names that occured during the scrape
        // SaveCheckedCompanyNames()
        // closeBrowser();
    } catch (err) {
        console.error(`leaf scrape failed with ${err}`)
    }
}

/**
 *
 * @function ScrapeCompanyMainData Scrapes the names/companyType/CompanyUrl
 * @param {Object} params 
 * @returns {Array} return array of objects that will hold names/CompanyType/CompanyUrl
 */
async function ScrapeCompanyMainData(params) {
    const { similarPagesSelectors, page } = params;

    let data = await page.evaluate((similarPagesSelectors) => {
        //getting the specific document node
        const CompaniesCard = document.querySelector(`${similarPagesSelectors.similarPageCard}`)
        const Companies = CompaniesCard.querySelectorAll(`${similarPagesSelectors.CompanyCard}`)


        let newData = []
        for (let i = 0; i < Companies.length - 1; i++) {
            let currentCompany = Companies[i]

            const Company = {
                CompanyName: currentCompany.querySelector(`${similarPagesSelectors.CompanyName}`).innerText,
                CompanyType: currentCompany.querySelector(`${similarPagesSelectors.CompanyType}`).innerText,
                CompanyWebLink: currentCompany.querySelector(`${similarPagesSelectors.CompanyLink}`).getAttribute("href")
            }
            //! Issue with CompanyTypeIsTech of error: ReferenceError: _CompanyTypeIsTech is not defined
            // if (CompanyTypeIsTech(Company.CompanyType)) {
            //     newData.push(Company);
            // }
            newData.push(Company);

        }
        return newData;
    }, similarPagesSelectors);

    return data;
}



LeafScrape()