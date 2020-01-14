import loginToLinkinedin from "../Activation_Functions/loginFunc.js";
import { closeBrowser } from "../Activation_Functions/broswerFunc.js";

const fs = require("fs");

//! old base seeds that wasn't getting good results
// const urls = [
//   "https://www.linkedin.com/search/results/companies/?keywords=software%20company%2C%20lebanon&origin=SWITCH_SEARCH_VERTICAL",
//   "https://www.linkedin.com/search/results/companies/?keywords=%20%20%20%20%20Information%20Technology%20%26%20Services%20%2C%20Beirut&origin=SWITCH_SEARCH_VERTICAL",
//   "https://www.linkedin.com/search/results/companies/?keywords=Internet%2C%20Beirut&origin=GLOBAL_SEARCH_HEADER",
//   "https://www.linkedin.com/search/results/companies/?keywords=mobile%20%2C%20lebanon&origin=GLOBAL_SEARCH_HEADER",
//   "https://www.linkedin.com/search/results/companies/?keywords=development%2C%20Beirut&origin=GLOBAL_SEARCH_HEADER",
//   "https://www.linkedin.com/search/results/companies/?keywords=Web%20development%2C%20Lebanon&origin=SWITCH_SEARCH_VERTICAL"
// ]

const urls = [
  "https://www.linkedin.com/search/results/companies/?keywords=Software%20company%2C%20lebanon&origin=SWITCH_SEARCH_VERTICAL",
  "https://www.linkedin.com/search/results/companies/?keywords=computer%20software%20lebanon&origin=SWITCH_SEARCH_VERTICAL",
  "https://www.linkedin.com/search/results/companies/?keywords=Information%20Technology%20%26%20Services%20lebanon&origin=SWITCH_SEARCH_VERTICAL",
  "https://www.linkedin.com/search/results/companies/?keywords=Web%20development%2C%20Lebanon&origin=SWITCH_SEARCH_VERTICAL",
  "https://www.linkedin.com/search/results/companies/?keywords=Internet%2C%20Beirut&origin=GLOBAL_SEARCH_HEADER",
  "https://www.linkedin.com/search/results/companies/?keywords=Web%20development%20lebanon&origin=GLOBAL_SEARCH_HEADER",
  "https://www.linkedin.com/search/results/companies/?keywords=web%20Beirut&origin=GLOBAL_SEARCH_HEADER",
  "https://www.linkedin.com/search/results/companies/?keywords=beirut%20mobile%20development&origin=GLOBAL_SEARCH_HEADER",
  "https://www.linkedin.com/search/results/companies/?keywords=lebanon%20mobile%20development&origin=GLOBAL_SEARCH_HEADER",
  "https://www.linkedin.com/search/results/companies/?keywords=web%20design%20lebanon&origin=GLOBAL_SEARCH_HEADER",
  "https://www.linkedin.com/search/results/companies/?keywords=software%20development%20lebanon&origin=GLOBAL_SEARCH_HEADER",
  "https://www.linkedin.com/search/results/companies/?keywords=software development lebanon&origin=GLOBAL_SEARCH_HEADER",
  "https://www.linkedin.com/search/results/companies/?keywords=software%20Beirut&origin=GLOBAL_SEARCH_HEADER"


]




//public variable to use in |recursiveScrappe| function
let maxpage = 0;

/**
 * @function Main The Main will run all all the fucntions to scrape all the companyNames
 */
(async () => {

  const page = await loginToLinkinedin("https://www.linkedin.com/login");

  const allData = [];

  for (let i = 0; i < urls.length; i++) {
    await page.goto(urls[i]);
    maxpage = await getMaxPage(page);
    const AllCompanyUrl = await recursiveScrappe(page, urls[i], 1, maxpage, []);
    allData.push(AllCompanyUrl)
  }

  //removing duplicates urls
  const uniqueUrls = RemoveDuplicates(allData)

  writeToJson(uniqueUrls);
  closeBrowser();

  console.log("Finished scraping company urls");
})();

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
function writeToJson(data) {
  fs.writeFileSync("CompanyUrls.json", JSON.stringify(data))
}

/**
 *@function RemoveDuplicates - removes Company url duplicates from arrays in array
 *
 * @param {Array} arr - The array that holds the arrays of company urls
 * @returns {Array} - array of unique company urls
 */
function RemoveDuplicates(arr) {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    element.forEach(url => {
      newArr.push(url)
    });
  }

  return newArr.reduce((uniqueUrl, url) => {
    return uniqueUrl.includes(url) ? uniqueUrl : [...uniqueUrl, url]
  }, [])
}


