import loginToLinkinedin from "../Activation_Functions/loginFunc.js";
import { closeBrowser } from "../Activation_Functions/broswerFunc.js";
import { similarPagesSelectors } from "./SimilarPagesSelector.js";
import { CheckIfCompanyTech } from "./utils/CheckIfCompanyTech.js";
import { CheckIfCompanyWasScraped, LoadCompanyNames, SaveCheckedCompanyNames } from "./utils/CheckedCompanies.js";

const BaseSeed = [
    "https://www.linkedin.com/company/groovy-antoid/",
]

let CompaniesStack = [];

async function LeafScrape() {
    LoadCompanyNames();

    const page = await loginToLinkinedin("https://www.linkedin.com/login");

    for (let i = 0; i < BaseSeed.length; i++) {
        await page.goto(BaseSeed[i]);

        //getting the data from similar page card
        let CompanyData = await ScrapeCompanyMainData({ similarPagesSelectors, page });

        //checking if the company have been searched from before
        if(CheckIfCompanyWasScraped(CompanyData.CompanyName)){
            //TODO: Check if Company is a TEch company(use the function in utils)
             //maybe add the extra conditions in utils
             
            CompaniesStack.push(...CompanyData)
        }
    }

    console.log(CompaniesStack)
    SaveCheckedCompanyNames()
    // closeBrowser();
}

async function ScrapeCompanyMainData(params) {
    const { similarPagesSelectors, page } = params;

    let data = await page.evaluate((similarPagesSelectors) => {
        //getting the specific document node
        const CompaniesCard = document.querySelector(`${similarPagesSelectors.similarPageCard}`)
        const Companies = CompaniesCard.querySelectorAll(`${similarPagesSelectors.CompanyCard}`)


        let newData = []
        for (let i = 0; i < Companies.length - 1; i++) {
            let currentCompany = Companies[i]

            let Company = {
                CompanyName: currentCompany.querySelector(`${similarPagesSelectors.CompanyName}`).innerText,
                CompanyType: currentCompany.querySelector(`${similarPagesSelectors.CompanyType}`).innerText,
                CompanyWebLink: currentCompany.querySelector(`${similarPagesSelectors.CompanyLink}`).getAttribute("href")
            }

            const companyIsTech = CheckIfCompanyTech(Company.CompanyName);

            if (companyIsTech) {
                newData.push(Company)
            }
        }
        return newData
    }, similarPagesSelectors);

    return data
}



LeafScrape()