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
  const urls = await JSON.parse(CompanyUrls);

  const page = await loginToLinkinedin("https://www.linkedin.com/login");
  for (let i = 0; i < urls.length; i++) {
    console.log(await ScrapeCompanySite(page, urls[i]));
  }
};

/**
 *@function ScrapeCompanySite Scraping the ["Header"] ["About"] in linkedIn companySite
 * @param {class} page  - page will provide you with browser and page functions
 * @param {string} companyUrl - will provide with company site url in linkedIn
 * @returns {object}
 */
const ScrapeCompanySite = async (page, companyUrl) => {
  const url = `https://www.linkedin.com${companyUrl}`;
  await page.goto(url);
  console.log("we are in", url);
  const headerContent = await ScrapeHeader(page);
  const aboutdata = await ScrapeAboutUs(page, url);
  return {
    MainData: headerContent,
    AboutCompany: aboutdata
  };
};

/**
 * @function ScrapeHeader Srcape the header part of company site
 * @param {class} page - page will provide you with browser and page functions
 * @returns {object} - return {"CompanyLogo", "CompanyName", "CompanyType", "CompanySmallInfo", "CompanyCity"}
 */
const ScrapeHeader = async page => {
  console.log("scraping header");
  console.log(headerSelectors.CompanyName);
  return await page.evaluate(headerSelectors => {
    let header = {
      CompanyName: "",
      CompanyType: "",
      CompanySmallInfo: "",
      CompanyCity: ""
    };
    for (let key in header) {
      const htmlContent = document.querySelector(`${headerSelectors[key]}`);
      if (htmlContent === null) {
        header[key] = "";
      } else {
        header[key] = htmlContent.innerText;
      }
    }
    return header;
  }, headerSelectors);
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
    return { CompanyDescription: description, CompanyWebLink: weblink };
  }, aboutSelector);
};

Main();
