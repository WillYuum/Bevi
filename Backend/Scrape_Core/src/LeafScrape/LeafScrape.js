import loginToLinkinedin from "../Activation_Functions/loginFunc.js"
import { closeBrowser } from "../Activation_Functions/broswerFunc.js";
import { similarPagesSelectors } from "./SimilarPagesSelector.js";

const BaseSeed = [
    "https://www.linkedin.com/company/groovy-antoid/",
]

let CompaniesStack = [];

async function LeafScrape() {
    const page = await loginToLinkinedin("https://www.linkedin.com/login");

    for (let i = 0; i < BaseSeed.length; i++) {
        await page.goto(BaseSeed[i]);

        let data = await ScrapeCompanyMainData({ similarPagesSelectors, page });
        CompaniesStack.push(...data)
    }

    console.log(CompaniesStack)
    // closeBrowser();
}

async function ScrapeCompanyMainData(params) {
    const { similarPagesSelectors, page } = params;

    let data = await page.evaluate((similarPagesSelectors) => {
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
            newData.push(Company)
        }
        return newData
    }, similarPagesSelectors);

    return data
}



LeafScrape()