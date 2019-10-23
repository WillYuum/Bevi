import React from "react";

import "./FilterButton.scss";

const FilterButton = ({ Type }) => {
  return <h2 className="CompanyType">{Type}</h2>;
};

export default FilterButton;
