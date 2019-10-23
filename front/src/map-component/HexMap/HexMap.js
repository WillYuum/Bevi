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
            while (index < 14) {
              return (
                <HexCard
                  key={index}
                  CompanyName={company.CompanyName}
                  CompanyType={company.Type}
                />
              );
            }
          })}
        </ul>
      </div>
    );
  }
}

export default HexMap;
