const puppeteer = require("puppeteer");
import Creds from "../credentials.js";
import browserFuncs from "./broswerFunc.js";

const USERNAME_SELECTOR = "#username";
const PASSWORD_SELECTOR = "#password";
const SUBMIT_BTN = ".btn__primary--large";

/**
 * @function loginToLInkined -this function will have steps to enter the login page and add try to login
 * @param {url} url this is the url of the login Page in linkedIn
 */
async function loginToLInkined(url) {
  const page = await browserFuncs.startBrowser();
  page.setViewport({ width: 1366, height: 768 });
  await page.goto(url);
  console.log("we are in", url);
  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(Creds.USERNAME);
  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type(Creds.PASSWORD);
  await page.click(SUBMIT_BTN);
  console.log("click on Submit button");
  console.log("loggedin");
}

export default loginToLInkined;
