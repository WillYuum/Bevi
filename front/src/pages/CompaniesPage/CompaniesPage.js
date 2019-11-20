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
    this.state = {
      selectedType: ""
    };
  }


  handleSelectChange = async (e) => {
    let selectedType = e.target.value;
    await this.setState({ selectedType })
    console.log(this.state.selectedType)
  }

  render() {

    const { selectedType } = this.state;

    const { CompanyData, CompanyTypes, ...props } = this.props;
    return (
      <div className="CompaniesPage-container">
        <div className="FilterSection"></div>
        <p className="amountOfCompanies">Companies Collected: <span>{CompanyData.length}</span></p>
        <div className="dropDown-container">
          <select onChange={this.handleSelectChange} className="dropDown-filter" name="selectType">
            <option val="undefined">Display all companies</option>
            {
              CompanyTypes.map((type, i) => {
                return (
                  <option key={i} value={type.TypeId}>{type.Type}</option>
                )
              })
            }
          </select>
        </div>
        <div className="CompaniesSection">
          <HexMap
            CompanyData={CompanyData}
            TypeId={props.match.params.id}
            filterCompaniesId={selectedType}
          />
        </div>
      </div>
    );
  }
}

export default CompaniesPage;
