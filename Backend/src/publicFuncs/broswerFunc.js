const puppeteer = require("puppeteer");

/**
 * @function startBrowser launches the browser + creating a new Tab
 * @returns {object} -return "browser" and "page" for more control on them on the next function
 */
async function startBrowser() {
  const browser = await puppeteer.launch({ headless: true, slowMo: 0 });
  const page = await browser.newPage();
  return { browser, page };
}

/**
 * @function closeBrowser - closes the browser as simple as  that
 */
async function closeBrowser(browser) {
  return browser.close();
}

export { startBrowser, closeBrowser };
