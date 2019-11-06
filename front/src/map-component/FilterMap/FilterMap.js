import React from "react";

import { checkColSize } from "../../utils/checkColSize.js";

//----------------IMPORT COMPONENTS------------------
import FilterButton from "../../components/FilterButton/FilterButton.js";
//----------------------END------------------

import "./FilterMap.scss";
import "../../public styles/Hex-Grid.scss";

import colOf6 from "../../public styles/colOf6.module.scss";

/**
 * @prop {array} CompanyTypes - takes array of company types
 * @prop {getTypeId} - send the getTypeId func in this prop
 * @prop {int} FilterButtonAmount - amount of filter button to map
 */
class FilterMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //state data
    const { CompanyTypes } = this.props;

    //Functions
    const { getTypeId } = this.props;

    //Conditional props
    const { FilterButtonAmount, colSize } = this.props;
    console.log(CompanyTypes);
    return (
      <div className="FilterMap-container">
        <ul className={`${colOf6.hexGrid} hexGrid`}>
          {CompanyTypes.map((type, index) => {
            while (index < FilterButtonAmount) {
              return (
                <FilterButton
                  key={index}
                  TypeId={type.TypeId}
                  Type={type.Type}
                  getTypeId={getTypeId}
                  FilterButtonModuleCss={checkColSize(colSize)}
                />
              );
            }
          })}
        </ul>
      </div>
    );
  }
}

export default FilterMap;
