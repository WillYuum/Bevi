import React from "react";

import { shuffleCompanies } from "../../utils/utils.js";

//----------------IMPORT COMPONENTS------------------
import HexMap from "../../map-component/HexMap/HexMap.js";
import FilterMap from "../../map-component/FilterMap/FilterMap.js";
//----------------IMPORT COMPONENTS------------------

import "./LandingPage.scss";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CompanyData: [],
      CompanyTypes: []
    };
  }
  // storing backend Url in readable variable
  Back_Url = process.env.REACT_APP_BEVY_API;

  componentDidMount = async () => {
    await this.getCompanyData();
    await this.getCompanyTypes();
  };

  /**
   * @function getCompanyData - fetches all Company Data From DB
   */
  getCompanyData = async () => {
    try {
      const req = await fetch(`${this.Back_Url}/companies`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const res = await req.json();
      const shuffledData = await shuffleCompanies(res.Companies);
      console.log("shuffled Data", shuffledData);
      this.setState({ CompanyData: shuffledData });
    } catch (err) {
      throw new Error(`Failed to fetch company Data with = ${err}`);
    }
  };

  getCompanyTypes = async () => {
    try {
      const req = await fetch(`${this.Back_Url}/companies/types`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const res = await req.json();
      console.log("here",res)
      this.setState({ CompanyTypes: res.CompanyTypes });
    } catch (err) {
      throw new Error(`Failed to fetch company Types Data with = ${err}`);
    }
  };

  render() {
    const { CompanyData, CompanyTypes } = this.state;
    return (
      <div className="LandingPage-container">
        <FilterMap CompanyTypes={CompanyTypes} />
        <HexMap CompanyData={CompanyData} />
      </div>
    );
  }
}

export default LandingPage;
