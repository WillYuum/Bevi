import React from "react";

import "./CompaniesPage.scss";

//----------------IMPORT COMPONENTS------------------
import HexMap from "../../map-component/HexMap/HexMap.js";
//----------------IMPORT COMPONENTS------------------

/**
 * @prop {array} CompanyData - takes in array of company Data
 */
class CompaniesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { CompanyData } = this.props;
    return (
      <div className="CompaniesPage-container">
        <div className="FilterSection"></div>
        <div className="CompaniesSection">
          <HexMap CompanyData={CompanyData} hexAmount={CompanyData.length} />
        </div>
      </div>
    );
  }
}

export default CompaniesPage;
