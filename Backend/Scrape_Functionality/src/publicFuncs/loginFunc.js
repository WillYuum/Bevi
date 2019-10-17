import { USERNAME, PASSWORD } from "../credentials.js";
import { startBrowser, closeBrowser } from "./broswerFunc.js";

//CSS SELECTORS FOR{Username imput, Password Input, Submit button}
const USERNAME_SELECTOR = "#username";
const PASSWORD_SELECTOR = "#password";
const SUBMIT_BTN = ".btn__primary--large"; 

/**
 * @function loginToLInkined -this function will have steps to enter the login page and add try to login
 * @param {url} url this is the url of the login Page in linkedIn
 * @returns page so that the you can still have the option of click and going places in the website
 */
async function loginToLInkinedin(url) {
  try {
    const { browser, page } = await startBrowser();
    page.setViewport({ width: 1366, height: 768 });
    await page.goto(url);
    console.log("we are in", url);
    page.waitForNavigation();
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(USERNAME);
    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(PASSWORD);
    await page.click(SUBMIT_BTN);
    console.log("click on Submit button");
    console.log("loggedin");
    return page;
  } catch (err) {
    console.log(err);
    throw new Error("loggin in to linkedIn Failed");
  }
}

export default loginToLInkinedin;
