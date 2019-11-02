import React from "react";

//----------------IMPORT COMPONENTS------------------
import HexCard from "../../components/HexCard/HexCard.js";
//----------------------END------------------

import "./HexMap.scss";
import "../../public styles/Hex-Grid.scss";

import colOf5 from "../../public styles/colOf5.module.scss";
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

  render() {
    const { CompanyData } = this.props;

    //Condition props
    const { hexAmount, TypeId } = this.props;
    return (
      <div className="HexMap-container">
        <ul className={`${colOf5.hexGrid} hexGrid`}>
          {CompanyData.map((company, index) => {
            while (index < hexAmount) {
              return (
                <HexCard
                  CompanyName={company.CompanyName}
                  CompanyType={company.Type}
                  hexModuleCss = {colOf5}
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
