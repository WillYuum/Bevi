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
    const { CompanyTypes } = this.props;
    return (
      <div className="FilterMap-container">
        {CompanyTypes.map((type, index) => {
          while (index < 6) {
            return <FilterButton Type={type.Type} />;
          }
        })}
      </div>
    );
  }
}

export default FilterMap;
