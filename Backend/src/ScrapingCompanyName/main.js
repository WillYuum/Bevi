import loginToLInkined from "../publicFuncs/loginFunc.js";
const url =
  "https://www.linkedin.com/search/results/companies/?keywords=software%20company%2C%20lebanon&origin=SWITCH_SEARCH_VERTICAL";

(async () => {
  const root = await loginToLInkined("https://www.linkedin.com/login");
  console.log(ScrapePages(root, url));
})();

/**
 * @function ScrapePages -helps to scrape multiple company names in many pages
 * @param {url} url takes in the default url provided and loops on the pages of the url
 */
async function ScrapePages(root, url) {
  try {
    await root.goto(url);
    const Collected_Company_Names = await root.evaluate(
      async ({ root, url }) => {
        // const data = [];
        //getting the last number of page from the url
        const getMaxPage = document.querySelector(
          "li.artdeco-pagination__indicator:nth-last-Child(1)"
        );
        //Scraping company names page by page
        const MaxPage = getMaxPage.innerText;
        console.log(MaxPage);
        for (let i = 1; i < MaxPage; i++) {
          const newurl = root.goto(`${url}&page=${i}`);
          console.log(newurl)
          // let receivedNames = await scrapeNames(root, newurl);
          // data.push(receivedNames);
        }
        // return data;
      },
    );

    return Collected_Company_Names;
  } catch (err) {
    console.log(err);
    throw new Error("scraping the page failed");
  }
}

/**
 * @function scrapeNames --scrapes the pages with the specific url provided
 * @param {url} url the url is the page that will get scraped
 */
const scrapeNames = async (root, url) => {
  let companyNames = [];
  try {
    const getCompanyNames = await root.evaluate(() => {
      let names = document.querySelectorAll("h3.search-result__title");
      names.forEach(name => {
        companyNames.push(name.innerText);
      });
    });
    await getCompanyNames();
  } catch (err) {
    console.log(err);
    throw new Error(`scraping page with link = ${url}`);
  }
};


const scrapeCompanyNames = async (root, url) => {
  try {
    return await root.evaluate(() => {
      const names = document.querySelectorAll("h3.search-result__title");
      return names.map(name => {
        return name.innerText;
      })
    })
  } catch (err) {
    console.error(`scrapeCompanyNames ${err} at uri ${url}`)
  }
}