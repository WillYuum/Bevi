import loginToLinkinedin from "../publicFuncs/loginFunc.js";
const fs = require("fs");

const url =
  "https://www.linkedin.com/search/results/companies/?keywords=software%20company%2C%20lebanon&origin=SWITCH_SEARCH_VERTICAL";

//public variable to use in |recursiveScrappe| function
let maxpage = 0;

/**
 * @function Main The Main will run all all the fucntions to scrape all the companyNames
 */
const Main = async () => {
  try {
    const page = await loginToLinkinedin("https://www.linkedin.com/login");
    await page.goto(url);
    maxpage = await getMaxPage(page);
    const AllCompanyUrl = await recursiveScrappe(page, url, 1, maxpage, []);
    return writeToJson(AllCompanyUrl);
  } catch (err) {
    console.log(`Fetching Main failed with = ${err}`);
  }
};

/**
 * @function getMaxPage - gets the maximum number of the page
 * @param {class} page  - page will provide you with browser and page functions
 * @returns {int} returns the maximum number of the page
 */
const getMaxPage = async page => {
  return await page.evaluate(() => {
    const maxPage = document.querySelector(
      "li.artdeco-pagination__indicator:nth-last-Child(1)"
    );

    return parseInt(maxPage.innerText);
  });
};

/**
 * @function getNamesFromPage - scrapes the names from the current page when called
 * @param {class} page - page will provide you with browser and page functions
 */
const getUrlFromPage = async page => {
  return await page.evaluate(() => {
    return [
      ...document.querySelectorAll(
        ".search-result__info a.search-result__result-link"
      )
    ].map(elem => {
      return elem.getAttribute("href");
    });
  });
};

/**
 * @function recursiveScrappe - it will scrape company names in every url and store them in array until current page === maxPage
 * @param {class} page -page will provide you with browser and page functions
 * @param {string} url - linkedin url
 * @param {int} currentPage - the first number of the paginated page
 * @param {int} max_page - the last number of the paginated page
 * @param {array} list - this list will store all the company names
 * @returns {array} - list of company names
 */
const recursiveScrappe = async (page, url, currentPage, max_page, list) => {
  const newUrl = `${url}&page=${currentPage}`;
  console.log("you are in page", currentPage);
  await page.goto(newUrl);
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight);
  });
  await page.waitFor(1500);
  const newList = await getUrlFromPage(page);

  console.log("Recieved comapny main Urls", newList);
  if (newList) {
    list = [...list, ...newList];
    if (currentPage < max_page) {
      return recursiveScrappe(page, newUrl, ++currentPage, max_page, list);
    } else {
      console.log("The list of company names", list);
      return list;
    }
  } else {
    console.log("There is something wrong with company names");
  }
};

/**
 * @function writeToJson this function will save the data into a json file
 * @param {array} data will take the array of data and turn it into json format
 */
const writeToJson = data => {
  fs.writeFileSync("CompanyUrls.json", JSON.stringify(data));
};

Main();
