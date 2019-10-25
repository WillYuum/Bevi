import React from "react";

import "./FilterButton.scss";

const FilterButton = ({ TypeId, Type, getTypeId }) => {
  return (
    <h2 onClick={async () => await getTypeId(TypeId)} className="CompanyType">
      {Type}
    </h2>
  );
};

export default FilterButton;
