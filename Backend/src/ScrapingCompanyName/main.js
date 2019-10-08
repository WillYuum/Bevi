import loginToLInkined from "../public/loginFunc.js";

/**
 * @async -run the scraping functionality
 */
(async () => {
  try {
    const root = await loginToLInkined("https://www.linkedin.com/login");
    root.goto(
      "https://www.linkedin.com/search/results/companies/?keywords=software%20company%2C%20lebanon&origin=SWITCH_SEARCH_VERTICAL&page=5"
    );
  } catch (err) {
    console.log(err);
    throw new Error("Main functionality failed");
  }
})();
