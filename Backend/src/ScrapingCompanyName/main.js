import loginToLInkined from "../public/loginFunc.js";

/**
 * @async -run the scraping functionality
 */
async () => {
  try {
    loginToLInkined("https://www.linkedin.com/login");
  } catch (err) {
    console.log(err);
    throw new Error("Main functionality failed");
  }
};
