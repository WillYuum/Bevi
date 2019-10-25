import React from "react";

//----------------IMPORT COMPONENTS------------------
import FilterButton from "../../components/FilterButton/FilterButton.js";
//----------------------END------------------

import "./FilterMap.scss";

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
    return (
      <div className="FilterMap-container">
        {CompanyTypes.map((type, index) => {
          while (index < 6) {
            return (
              <FilterButton
                key={index}
                TypeId={type.TypeId}
                Type={type.Type}
                getTypeId={getTypeId}
              />
            );
          }
        })}
      </div>
    );
  }
}

export default FilterMap;
