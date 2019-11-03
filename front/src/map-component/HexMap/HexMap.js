import React from "react";

//----------------IMPORT COMPONENTS------------------
import HexCard from "../../components/HexCard/HexCard.js";
//----------------------END------------------

import "./HexMap.scss";
import "../../public styles/Hex-Grid.scss";

import colOf6 from "../../public styles/colOf6.module.scss";
import colOf4 from "../../public styles/colOf4.module.scss";
import colOf3 from "../../public styles/colOf3.module.scss";

/**
 * @class HexMap
 * @prop {array} CompanyData - array of data
 * @prop {string} TypeId - it could empty or one of the type in the database
 * @prop {int} hexAmount - the amount of companies to mapped
 */
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

  checkColSize = size => {
    if (size === "3") {
      return colOf3.hex;
    } else if (size === "4") {
      return colOf4.hex;
    } else {
      return colOf6.hex;
    }
  };

  render() {
    const { CompanyData } = this.props;

    //Condition props
    const { hexAmount, colSize, TypeId } = this.props;
    return (
      <div className="HexMap-container">
        <ul className={`${colOf6.hexGrid} hexGrid`}>
          {CompanyData.map((company, index) => {
            while (index < hexAmount) {
              return (
                <HexCard
                  CompanyName={company.CompanyName}
                  CompanyType={company.Type}
                  hexModuleCss={this.checkColSize(colSize)}
                />
              );
            }
            // if (company.CompanytypeId === TypeId) {
            //   while (index < hexAmount) {
            //     return (
            //       <HexCard
            //         CompanyName={company.CompanyName}
            //         CompanyType={company.Type}
            //       />
            //     );
            //   }
            // }
            // if (TypeId === "") {
            //   while (index < hexAmount) {
            //     return (
            //       <HexCard
            //         CompanyName={company.CompanyName}
            //         CompanyType={company.Type}
            //       />
            //     );
            //   }
            // }
          })}
        </ul>
      </div>
    );
  }
}

export default HexMap;
