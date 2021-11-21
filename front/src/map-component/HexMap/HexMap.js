import React from "react";

import { checkColSize } from "../../utils/checkColSize.js";
import { GetCompaniesTypeById } from "../../BackEndController/BackendAPI.js";

//----------------IMPORT COMPONENTS------------------
import HexCard from "../../components/HexCard/HexCard.js";
//----------------------END------------------

import "./HexMap.scss";
import "../../public styles/Hex-Grid.scss";

import colOf6 from "../../public styles/colOf6.module.scss";

/**
 * @prop {array} CompanyData - array of data
 * @prop {string} TypeId - it could empty or one of the type in the database
 * @prop {int} hexAmount - the amount of companies to mapped
 * @prop {int} colSize - The amount of hex/column
 */
class HexMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCompanies: []
    };
  }

  // storing backend Url in readable variable
  // Back_Url = process.env.REACT_APP_BEVY_API;

  componentDidMount() {
    const { ...props } = this.props;
    if (props.TypeId) {
      GetCompaniesTypeById(props.TypeId, this.OnRecieveCompanyTypeData);
    } else {
      const { CompanyData } = this.props;
      return this.setState({ filterCompanies: CompanyData });
    }
  }

  async componentWillReceiveProps(props) {
    if (props.filterCompaniesId) {
      await GetCompaniesTypeById(props.filterCompaniesId, this.OnRecieveCompanyTypeData)
    } else {
      return;
    }
  }


  OnRecieveCompanyTypeData = data => {
    this.setState({ filteredCompanies: data.Companies });
  }



  render() {
    const { CompanyData } = this.props;

    //Conditional props
    const { hexAmount, colSize, TypeId } = this.props;

    const { filteredCompanies } = this.state;
    const { ...props } = this.props;
    return (
      <div className="HexMap-container">
        <ul className={`${colOf6.hexGrid} hexGrid`}>
          {filteredCompanies.length !== 0
            ? filteredCompanies.map((company, index) => {
              return (
                <HexCard
                  key={index}
                  CompanyId={company.CompanyId}
                  CompanyName={company.CompanyName}
                  CompanyType={company.Type}
                  hexModuleCss={checkColSize(colSize)}
                />
              );
            })
            : CompanyData.map((company, index) => {
              if (hexAmount) {
                while (hexAmount > index) {
                  return (
                    <HexCard
                      key={index}
                      CompanyId={company.CompanyId}
                      CompanyName={company.CompanyName}
                      CompanyType={company.Type}
                      hexModuleCss={checkColSize(colSize)}
                    />
                  );
                }
              } else {
                return (
                  <HexCard
                    key={index}
                    CompanyId={company.CompanyId}
                    CompanyName={company.CompanyName}
                    CompanyType={company.Type}
                    hexModuleCss={checkColSize(colSize)}
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
