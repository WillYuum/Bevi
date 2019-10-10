import loginToLInkinedin from "../publicFuncs/loginFunc.js";
const url =
  "https://www.linkedin.com/search/results/companies/?keywords=software%20company%2C%20lebanon&origin=SWITCH_SEARCH_VERTICAL";

let max_page = 0;
/**
 * @function Main The Main will run all all the fucntions to scrape all the companyNames
 */
const Main = async () => {
  try {
    const root = await loginToLInkinedin("https://www.linkedin.com/login");
    await root.goto(url);
    let arr = [];
    let startingPage = 1;
    // max_page = await root.evaluate(() => {
    //   const page = document.querySelector(
    //     "li.artdeco-pagination__indicator:nth-last-Child(1)"
    //   );
    //   return parseInt(page.innerText);
    // });
    max_page = await getMaxPage(root);
    console.log("max page", max_page);
    const data = await ScrapeCompanyNames(root, url, startingPage, arr);
    console.log("Here willy", data);
  } catch (err) {
    console.log(`Main scraping failed with = ${err}`);
  }
};

/**
 * @function getMaxPage - gets the maximum number of the page
 * @param {class} root  - root will provide you with browser and page functions
 * @returns {int} returns the maximum number of the page
 */
const getMaxPage = async root => {
  return await root.evaluate(() => {
    const page = document.querySelector(
      "li.artdeco-pagination__indicator:nth-last-Child(1)"
    );
    return parseInt(page.innerText);
  });
};

const getPageContent = async root => {
  return await root.evaluate(() => {
    const page = [...document.querySelectorAll(
      "h3.search-result__title"
    )];
    return page;
  })
}

/**
 * @function ScrapeCompanyNames this function is recusrivly scrape all the pages depending on the MaxPage
 * @param {class} root - root will provide you with browser and page functions
 * @param {object{url, int, array}} PageInfo - data information that has to be provided to scrape company names
 */
async function ScrapeCompanyNames(root, url, currentPage, list = []) {
  console.log("we are in he url ", url);
  const newUrl = `${url}&page=${currentPage}`;
  console.log("The new url is", newUrl);
  await root.goto(newUrl);
  console.log("we are in page", await currentPage);
  const names = await getPageContent(root);
 
  names.forEach(text => {
    console.log(text.innerText);
  })

  if (names) {
    const newList = names.map(name => {
      return name.innerText;
    });
    list = [...list, ...newList];
  }

  if (currentPage < max_page) {
    ++currentPage;
    return await ScrapeCompanyNames(root, url, currentPage, list);
  } else {
    return list;
  }
}

Main();
