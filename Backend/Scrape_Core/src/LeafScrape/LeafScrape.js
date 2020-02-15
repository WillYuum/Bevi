import loginToLinkinedin from "../Activation_Functions/loginFunc.js";
import { closeBrowser } from "../Activation_Functions/broswerFunc.js";
import { similarPagesSelectors } from "./SimilarPagesSelector.js";
import { CompanyTypeIsTech } from "./utils/CompanyTypeIsTech";
import { CheckIfCompanyWasScraped, LoadCompanyNames, SaveCheckedCompanyNames } from "./utils/CheckedCompanies.js";

const CompaniesStack = [
    "/company/groovy-antoid/",
]

const leafScrapeLimit = 5;

let page;
async function StartLeafScrape() {
    page = await loginToLinkinedin("https://www.linkedin.com/login");
    LeafScrape(page);
}


async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function LeafScrape() {
    // LoadCompanyNames();
    try {
        for (let index = 0; index < CompaniesStack.length; index++) {
            if (leafScrapeLimit === index) {
                console.log(CompaniesStack);
                closeBrowser();
                return;
            }

            console.log(`going to ${await page.url()}`);
            await page.goto("https://www.linkedin.com" + CompaniesStack[index]);

            if (await page.url() !== CompaniesStack[index]) {
               await page.click(".org-page-navigation__items li");
            }
            await timeout(5000);

            //getting the data from similar page card
            let CompanyData = await ScrapeCompanyMainData({ similarPagesSelectors, page });

            //loops throught all the company info
            for (let index = 0; index < CompanyData.length; index++) {
                const company = CompanyData[index];

                //checking if the company have been searched from before
                if (CheckIfCompanyWasScraped(company.CompanyName)) {
                    console.log(`${company.CompanyName} was scraped`);
                } else {
                    console.log(`${company.CompanyName} was not scraped`);
                    CompaniesStack.push(company.CompanyWebLink);
                }
            }
        }

    } catch (err) {
        console.error(`leaf scrape failed with ${err}`)
    }
}

/**
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


StartLeafScrape();