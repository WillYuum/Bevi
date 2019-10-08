import loginToLInkined from "../publicFuncs/loginFunc.js";
const url =
  "https://www.linkedin.com/search/results/companies/?keywords=software%20company%2C%20lebanon&origin=SWITCH_SEARCH_VERTICAL&page=1";

/**
 * @async -run the scraping functionality
 */
(async () => {
  try {
    const root = await loginToLInkined("https://www.linkedin.com/login");
    await root.goto(url);
    const ScrapedNames = await root.evaluate(() => {
      let companyNames = [];
      try {
        let names = document.querySelectorAll("h3.search-result__title");
        names.forEach(name => {
          companyNames.push(name.innerText);
        });
        return companyNames;
      } catch (err) {
        console.log(err);
        throw new Error("scraping company names failed");
      }
    });
    console.log(ScrapedNames);
  } catch (err) {
    console.log(err);
    throw new Error("Main functionality failed");
  }
})();
