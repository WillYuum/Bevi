import React from "react";

import "./HexIntro.scss";
import "./FilterButton.scss";

/**
 * @prop {int} TypeId
 * @param {Type} Type
 */
const FilterButton = ({ TypeId, Type, getTypeId }) => {
  return (
    <li className="hex">
      <div className="hexIn">
        <div className="hexLink">
          <p className="FilterText">{Type}</p>
        </div>
      </div>
    </li>
  );
};

export default FilterButton;
