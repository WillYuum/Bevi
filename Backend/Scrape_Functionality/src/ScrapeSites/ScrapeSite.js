import fs from "fs";
import loginToLinkinedin from "../publicFuncs/loginFunc.js";
import initCompanyController from "../../../src/Controllers/CompaniesController.js";
import checkIfTypeExist from "./checkTypeExist.js";

// Linkedin companySite selectors that is needed for this project
import {
  headerSelectors,
  aboutSelector
} from "./CompanyStructs/SiteSelector.js";

/**
 * @function Main - Scraping linkedIn Company Site happens Here
 */
const Main = async () => {
  const CompanyUrls = fs.readFileSync("CompanyUrls.json");
  const urls = await JSON.parse(CompanyUrls);

  const page = await loginToLinkinedin("https://www.linkedin.com/login");
  for (let i = 0; i < urls.length; i++) {
    console.log(i);
    await ScrapeCompanySite(page, urls[i]);
  }
  console.log("finished scraping");
};

/**
 *@function ScrapeCompanySite Scraping the ["Header"] ["About"] in linkedIn companySite
 * @param {class} page  - page will provide you with browser and page functions
 * @param {string} companyUrl - will provide with company site url in linkedIn
 * @returns {object}
 */
const ScrapeCompanySite = async (page, companyUrl) => {
  const controller = await initCompanyController();

  const url = `https://www.linkedin.com${companyUrl}`;
  await page.goto(url);
  console.log("we are in", url);
  const headerContent = await ScrapeHeader(page);
  const aboutdata = await ScrapeAboutUs(page, url);

  //changing the CompanyType to id so it can be identified as an Id in the database
  const TypeId = await checkIfTypeExist(headerContent.CompanyType);
  headerContent.CompanyType = await TypeId;

  await ScrapeCompanyLogo(page, headerContent.CompanyName);

  await controller.createCompany({
    MainData: headerContent,
    AboutCompany: aboutdata
  });
};

/**
 * @function ScrapeCompanyLogo - saving the company logo in folder
 * @param {class} page
 * @param {string} companyName company name will be added to the directory of company Logo
 */
const ScrapeCompanyLogo = async (page, companyName) => {
  console.log("Scraping Company Logo");
  const ifLogoExist = await page.evaluate(() => {
    return document.querySelector("img.org-top-card-primary-content__logo");
  });
  if (ifLogoExist) {
    const Logo = await page.$(`${headerSelectors.CompanyLogo}`);
    await Logo.screenshot({
      path: "public/companylogos/" + companyName + ".png",
      type: "png",
      omitBackground: true
    });
  } else {
    console.log("there is no logo");
    return;
  }
};

/**
 * @function ScrapeHeader Srcape the header part of company site
 * @param {class} page - page will provide you with browser and page functions
 * @returns {object} - return {"CompanyLogo", "CompanyName", "CompanyType", "CompanySmallInfo", "CompanyCity"}
 */
const ScrapeHeader = async page => {
  console.log("scraping header");
  return await page.evaluate(headerSelectors => {
    let header = {
      CompanyName: "",
      CompanySmallInfo: "",
      CompanyType: "",
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
    const { CompanyName, CompanySmallInfo, CompanyType, CompanyCity } = header;
    if (!CompanyName && !CompanySmallInfo && !CompanyType && !CompanyCity) {
      return;
    } else {
      return header;
    }
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
    const aboutData = {
      CompanyWebLink: "",
      CompanyDescription: "",
      CompanyEmployeeSize: ""
    };

    for (let key in aboutData) {
      const htmlContent = document.querySelector(`${aboutSelector[key]}`);
      if (htmlContent === null) {
        aboutData[key] = "";
      } else {
        aboutData[key] = htmlContent.innerText;
      }
    }
    return aboutData;
  }, aboutSelector);
};

Main();
