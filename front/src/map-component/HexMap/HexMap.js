import React from "react";

//----------------IMPORT COMPONENTS------------------
import HexCard from "../../components/HexCard/HexCard.js";
//----------------------END------------------

import "./HexMap.scss";

class HexMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { CompanyData } = this.props;
    return (
      <div className="HexMap-container">
        <ul id="hexGrid">
          {CompanyData.map((company, index) => {
            return (
              <HexCard
                key={index}
                CompanyName={company.CompanyName}
                CompanyType={company.Type}
              />
            );
          })}
        </ul>
        {CompanyData.map((company, index) => {
          return (
            <img
              src={`http://localhost:3001/public/companylogos/${company.CompanyName}.png`}
            ></img>
          );
        })}
      </div>
    );
  }
}

export default HexMap;
