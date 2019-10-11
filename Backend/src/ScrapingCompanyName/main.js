import loginToLInkinedin from "../publicFuncs/loginFunc.js";
const url =
  "https://www.linkedin.com/search/results/companies/?keywords=software%20company%2C%20lebanon&origin=SWITCH_SEARCH_VERTICAL";

//public variable to use in |recursiveScrappe| function
let maxpage = 0;

/**
 * @function Main The Main will run all all the fucntions to scrape all the companyNames
 */
const Main = async () => {
  try {
    const root = await loginToLInkinedin("https://www.linkedin.com/login");
    await root.goto(url);
    maxpage = await getMaxPage(root);
    const x = await getNamesFromPage(root);
    console.log(x);
    // return recursiveScrappe(root, url, 1, maxpage, []);
  } catch (err) {
    console.log(`Fetching Main failed with = ${err}`);
  }
};

/**
 * @function getMaxPage - gets the maximum number of the page
 * @param {class} root  - root will provide you with browser and page functions
 * @returns {int} returns the maximum number of the page
 */
const getMaxPage = async root => {
  return await root.evaluate(() => {
    const maxPage = document.querySelector(
      "li.artdeco-pagination__indicator:nth-last-Child(1)"
    );
    return parseInt(maxPage.innerText);
  });
};

/**
 * @function getNamesFromPage - scrapes the names from the current page when called
 * @param {class} root - root will provide you with browser and page functions
 */
const getNamesFromPage = async root => {
  return await root.evaluate(() => {
    const arr = [];
    const names = document.querySelectorAll("h3.search-result__title");
    console.log("names", names);
    names.forEach(elem => {
      arr.push(elem.innerText);
    });
    return arr;
  });
};

/**
 * @function recursiveScrappe - it will scrape company names in every url and store them in array until current page === maxPage
 * @param {class} root -root will provide you with browser and page functions
 * @param {string} url - linkedin url
 * @param {int} currentPage - the first number of the paginated page
 * @param {int} max_page - the last number of the paginated page
 * @param {array} list - this list will store all the company names
 * @returns {array} - list of company names
 */
const recursiveScrappe = async (root, url, currentPage, max_page, list) => {
  const newUrl = `${url}&page=${currentPage}`;
  await root.goto(newUrl);
  const names = await getNamesFromPage(root);

  if (names) {
    const newList = names;
    list = [...list, ...newList];

    if (currentPage <= max_page) {
      ++currentPage;
      return await recursiveScrappe(root, newUrl, currentPage, max_page, list);
    } else {
      console.log("The list of company names", list);
    }
  } else {
    console.log("There is something wrong with company names");
  }
};

Main();
