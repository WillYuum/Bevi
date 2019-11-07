import React from "react";

import { Link } from "react-router-dom";

import HexIntro from "../../public styles/HexIntro.module.scss";
import hexCard from "./FilterButton.module.scss";

/**
 * @prop {int} TypeId
 * @prop {string} Type
 * @prop {string} FilterButtonModuleCss
 * @param {func} getTypeId - the function will be added to onlick to get the Id of the type
 */
const FilterButton = ({ TypeId, Type, FilterButtonModuleCss, getTypeId }) => {
  return (
    <li className={`${FilterButtonModuleCss} ${hexCard.hex} ${HexIntro.hex}`}>
      <Link to={`/companies/${TypeId}`}>
        <div className={hexCard.hexIn}>
          <div className={hexCard.hexLink}>
            <div className={hexCard.filterTextContainer}>
              <p className={hexCard.FilterText}>{Type}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default FilterButton;
