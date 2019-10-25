import React from "react";

//----------------IMPORT COMPONENTS------------------
import HexCard from "../../components/HexCard/HexCard.js";
//----------------------END------------------

import "./HexMap.scss";

class HexMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCompanies: []
    };
  }

  getCompaniesByType = async TypeId => {
    try {
      const req = await fetch(``, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const res = await req.json();
      this.setState({ FilteredCompanies: res.companies });
    } catch (err) {
      throw new Error("getting company Data");
    }
  };

  render() {
    const { CompanyData, TypeId } = this.props;
    return (
      <div className="HexMap-container">
        <ul id="hexGrid">
          {CompanyData.map((company, index) => {
            if (company.CompanytypeId === TypeId) {
              while (index < 14) {
                return (
                  <HexCard
                    CompanyName={company.CompanyName}
                    CompanyType={company.Type}
                  />
                );
              }
            }
            if (TypeId === "") {
              while (index < 14) {
                return (
                  <HexCard
                    CompanyName={company.CompanyName}
                    CompanyType={company.Type}
                  />
                );
              }
            }
          })}
        </ul>
      </div>
    );
  }
}

export default HexMap;
