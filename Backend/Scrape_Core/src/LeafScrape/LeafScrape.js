import loginToLinkinedin from "../Activation_Functions/loginFunc.js"
import { closeBrowser } from "../Activation_Functions/broswerFunc.js";
import { similarPagesSelectors } from "./SimilarPagesSelector.js"

const BaseSeed = [
    "https://www.linkedin.com/company/groovy-antoid/",
]

let CompaniesStack = []

async function LeafScrape() {
    const page = await loginToLinkinedin("https://www.linkedin.com/login");

    //loop
    for (let i = 0; i < BaseSeed.length; i++) {
        await page.goto(BaseSeed[i])

        const CompaniesCard = await page.evaluate(similarPagesSelectors => {
            return Card = document.querySelector(similarPagesSelectors.similarPageCard)
        }, similarPagesSelectors);

        const Company = await ScrapeCompanyMainData({ CompaniesCard, similarPagesSelectors, page })
        CompaniesStack.push(Company)
    }

    console.log(CompaniesStack)
}

async function ScrapeCompanyMainData(params) {
    const { Card, page, similarPagesSelectors } = params

    //! Stuck here in error where querySelector can't work with undefined value
    const data = await page.evaluate(({ Card, similarPagesSelectors }) => {
        //get Company Name from card
        const CompanyName = Card.querySelector(`${similarPagesSelectors.CompanyName}`)

        //get Company Type from card
        const CompanyType = Card.querySelector(`${similarPagesSelectors.CompanyType}`)

        //get Company Web Link from card
        const CompanyWebLink = Card.querySelector(`${similarPagesSelectors.CompanyLink}`)

        return {
            CompanyName,
            CompanyType,
            CompanyWebLink
        }
    }, { Card, similarPagesSelectors })

    console.log(data)
}



LeafScrape()