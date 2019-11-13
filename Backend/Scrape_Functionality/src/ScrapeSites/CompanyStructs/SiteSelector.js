// All Selectors in Header section of linkedIn company site
export const headerSelectors = {
  CompanyLogo: "img.org-top-card-primary-content__logo",
  CompanyHeroImage: "img.pic-cropper__target-image",
  CompanyName: "h1.org-top-card-summary__title",
  CompanyType: "div.org-top-card-summary__industry",
  CompanySmallInfo: "p.t-16",
  CompanyCity: "div.org-top-card-summary__headquarter"
};

//All Selectors in About section of linkedIn company site
export const aboutSelector = {
  CompanyWebLink: ".org-grid__core-rail--wide span.link-without-visited-state",
  CompanyDescription: "p.break-words",
  CompanyEmployeeSize:
    "dd.org-about-company-module__company-size-definition-text",
  ExtraInfo: {
    term: ".org-page-details__definition-term",
    value: ".org-page-details__definition-text"
  }
};
