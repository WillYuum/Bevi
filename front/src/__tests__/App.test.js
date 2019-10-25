import React from "react";
import LandingPage from "../pages/LandingPage/LandingPage.js";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import nock from "nock";
const waitUntil = require("async-wait-until");

describe("<LandingPage>", () => {
  beforeAll(() => {
    nock("http://localhost:3001")
      .persist()
      .log(console.log)
      .get("/companies")
      .reply(200, [
        {
          CompanyDescription:
            "Soft Flow, Established in 1991, a Microsoft Certified Gold Partner & SAP Partner, is a leading IT Company with a presence in the MEA & Gulf Region; providing the most modernized Business Cloud Solutions , ERPs, Software Development/Mobile Applications, IT infrastructure, Professionals Services ,Consultancy,  High end Implementations & IT support.\n\nOur Main Solutions/Products from Microsoft: Office 365, Azure, SharePoint, SQL, System Center, Exchange, Active Directory, System Center\n\nOur Main Solutions/Products from SAP: SuccessFactors (HRIS), Analytics BusinessObjects,  SAP S/4 HANA, Hybris,  Business One (business management software/ERP), \n\nHaving more than 29 years of expertise in information technology services & World-Class partnerships, Soft Flow family is now growing & evolving into a holding gathering a group of subsidiaries specialized in specific solutions.\n\nRecently Soft Flow Teamed up with Arago consulting France to create a joint Venture named “Arow Consulting” based in Lebanon & specialized in Selling & implementing the top notch of Second Generation HRIS software Cloud Solutions: SuccessFactors by SAP. Arow Already has an important portfolio of clients in the MEA & North Africa & has executed several projects successfully. Find out More on www.arowconsulting.com \n\nSPS is the newest Subsidiary of Soft Flow, a company Specialized in Microsoft Technology services that will be officially Launched in October 2016.",
          CompanyEmployeeSize: "51-200 employees",
          CompanyId: 17,
          CompanyLogo: null,
          CompanyName: "Soft Flow Group",
          CompanySmallInfo: "Microsoft Certified Gold Partner & SAP Partner",
          CompanyWebLink: "http://www.softflow.com.lb",
          CompanytypeId: 51,
          Type: " Information Technology & Services",
          TypeId: 51
        },
        {
          CompanyDescription:
            "Our company (“Intranetworking and Software Consultant Company [ISC] sarl”) is a limited liability company incorporated in the Republic of Lebanon and registered under the number 61123 at Baabda, Lebanon, date September 8, 1997.\r\n\r\nISC sarl offers, in the world of corporate, tailored business solutions to facilitate e-commerce activities, bridge between financial and physical markets, and provide enhanced online shopping practices.\r\n\r\nISC sarl owns and operates the domain name fourmetalsmarket.com to intermediate as Introducing Broker facilitating investment opportunities in precious metals, and to provide unique e-shopping experience.",
          CompanyEmployeeSize: "2-10 employees",
          CompanyId: 12,
          CompanyLogo: null,
          CompanyName: "Intranetworking & Software Consultant (ISC) sarl",
          CompanySmallInfo: "",
          CompanyWebLink: "http://www.isc-lbn.com",
          CompanytypeId: 51,
          Type: " Information Technology & Services",
          TypeId: 51
        }
      ]);
  });
  it("componentDidMount + updates state", async done => {
    const wrapper = mount(<LandingPage />);
    await waitUntil(() => wrapper.state("CompanyData").length !== 0);
    expect(wrapper.state("CompanyData").length).toEqual(3);
    done();
  });
});
