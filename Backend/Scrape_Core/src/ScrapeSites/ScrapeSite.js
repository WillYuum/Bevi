import fs from "fs";
import loginToLinkinedin from "../Activation_Functions/loginFunc.js"
import { closeBrowser } from "../Activation_Functions/broswerFunc.js";
import initCompanyController from "../../../src/Controllers/CompaniesController.js";
import checkIfTypeExist from "./checkTypeExist.js";
import { checkIfCompanyTech } from "./CheckIfCompanyTech.js";

import { ScrapeHeader } from "./ScrapeHeader/ScrapeHeader.js/index.js.js";
import { ScrapeAboutUs } from "./ScrapeAboutUs/ScrapeAboutUs.js.js";
import { ScrapeCompanyLogo, ScrapeHeroImage } from "./ScrapeHeader/ScrapeImages.js/index.js.js";

/**
 * @function Main - Scraping linkedIn Company Site happens Here
 */
const Main = async () => {
  const CompanyUrls = fs.readFileSync("NewUrls.json");
  const urls = await JSON.parse(CompanyUrls);

  //!THIS IS TO REMOVE DUPLICATES AND SHOULD BE ADDED TO URL SCRAPING FUNCTIONALITY
  // const newUrls = urls.reduce((uniqueUrl, url) => {
  //   return uniqueUrl.includes(url) ? uniqueUrl : [...uniqueUrl, url]
  // }, [])

  // console.log("The new Url", newUrls)
  // fs.writeFileSync("NewUrls.json", JSON.stringify(newUrls))


  const page = await loginToLinkinedin("https://www.linkedin.com/login");
  for (let i = 0; i < urls.length; i++) {
    await ScrapeCompanySite(page, urls[i]);
  }
  console.log("finished scraping");
  closeBrowser();
};



/**
 *@function ScrapeCompanySite Scraping the ["Header"] ["About"] in linkedIn companySite
 * @param {class} page - page will provide you with browser and page functions
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

  console.log(checkIfCompanyTech(headerContent.CompanyType));
  if (checkIfCompanyTech(headerContent.CompanyType)) {

    //changing the CompanyType to id so it can be identified as an Id in the database
    const TypeId = await checkIfTypeExist(headerContent.CompanyType);
    headerContent.CompanyType = await TypeId;

    await ScrapeCompanyLogo(page, headerContent.CompanyName);

    //removed scraping the hero image for design reasons
    //// await ScrapeHeroImage(page, headerContent.CompanyName);

    // Saving CompantData to database
    await controller.createCompany({
      MainData: headerContent,
      AboutCompany: aboutdata
    });
  } else {
    return;
  }
};

Main();
