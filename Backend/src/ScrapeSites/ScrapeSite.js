import fs from "fs";
import loginToLinkinedin from "../publicFuncs/loginFunc.js";

// Linkedin companySite selectors that is needed for this project
import {
  headerSelectors,
  aboutSelector
} from "./CompanyStructs/SiteSelector.js";

/**
 * @function Main - Scraping linkedIn Company Site happens Here
 */
const Main = async () => {
  console.log(aboutSelector.CompanyWebLink);
  const CompanyUrls = fs.readFileSync("CompanyUrls.json");
  const x = await JSON.parse(CompanyUrls);

  const page = await loginToLinkinedin("https://www.linkedin.com/login");
  for (let i = 0; i < 2; i++) {
    console.log(await ScrapeCompanySite(page, x[i]));
  }
};

/**
 *@function ScrapeCompanySite Scraping the ["Header"] ["About"] in linkedIn companySite
 * @param {class} page  - page will provide you with browser and page functions
 * @param {string} companyUrl - will provide with company site url in linkedIn
 */
const ScrapeCompanySite = async (page, companyUrl) => {
  const url = `https://www.linkedin.com${companyUrl}`;
  await page.goto(url);
  console.log("we are in", url);
  const aboutdata = await ScrapeAboutUs(page, url);
  return aboutdata;
};

/**
 *@function ScrapeAboutUs - Scrapes the about us section in company Site
 * @param {class} page - page will provide you with browser and page functions
 * @param {string} url - The company site url
 * @return {object} - this is about us info for company site
 */
const ScrapeAboutUs = async (page, url) => {
  const AboutUsUrl = `${url}about/`;
  await page.goto(AboutUsUrl);
  console.log("we are in", AboutUsUrl);
  return await page.evaluate(aboutSelector => {
    const description = document.querySelector(
      `${aboutSelector.CompanyDescription}`
    ).innerHTML;
    const weblink = document.querySelector(`${aboutSelector.CompanyWebLink}`)
      .innerText;
    return { description: description, CompanyWebLink: weblink };
  }, aboutSelector);
};

Main();
