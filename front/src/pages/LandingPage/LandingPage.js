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
      CompanyData: []
    };
  }

  componentDidMount = async () => {
    await this.getCompanyData();
  };

  /**
   * @function getCompanyData - fetches all Company Data From DB
   */
  getCompanyData = async () => {
    try {
      const req = await fetch("http://localhost:3001/companies", {
        method: "GET"
      });
      const res = await req.json();
      // console.log(res);
      const shuffledData = await shuffleCompanies(res.Companies);
      console.log("shuffled Data", shuffledData);
      this.setState({ CompanyData: shuffledData });
    } catch (err) {
      throw new Error(`Failed to fetch company Data with = ${err}`);
    }
  };
  render() {
    return (
      <div className="LandingPage-container">
        <HexMap CompanyData={this.state.CompanyData} />
      </div>
    );
  }
}

export default LandingPage;
