const puppeteer = require("puppeteer");

let browser;
const TimeOut = 50;

/**
 * @function startBrowser launches the browser + creating a new Tab
 * @returns {object} -return "browser" and "page" for more control on them on the next function
 */
async function startBrowser() {
  browser = await puppeteer.launch({ headless: false, slowMo: 0 });
  const page = await browser.newPage();
  page.setDefaultTimeout(TimeOut * 1000);
  return { browser, page };
}

/**
 * @function closeBrowser - closes the browser as simple as  that
 */
async function closeBrowser() {
  return browser.close();
}

export { startBrowser, closeBrowser };
