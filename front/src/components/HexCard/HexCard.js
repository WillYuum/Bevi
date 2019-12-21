import React from "react";

import hexCard from "./HexCard.module.scss";
import HexIntro from "../../public styles/HexIntro.module.scss";
import { Link } from "react-router-dom";
/**
 *@param {int} CompanyId
 * @param {array} CompanyName
 * @param {string} CompanyType
 * @param {cssModule} hexModuleCss - executes this css module you added to the hex selector
 */
const HexCard = ({ CompanyId, CompanyName, CompanyType, hexModuleCss }) => {
  //simplifying the procces.env variable
  const LOGO_BACK_DIRECTORY = process.env.REACT_APP_COMPANYLOGO_DIRECTORY;

  return (
    <li className={`${hexModuleCss} ${hexCard.hex} ${HexIntro.hex}`}>
      <Link to={`/company/${CompanyId}`}>
        <div className={hexCard.hexIn}>
          <div className={hexCard.hexLink} style={{
            backgroundImage: `url("${LOGO_BACK_DIRECTORY}/companylogos/${
              `${CompanyName}.png`
              }")`
          }} >
            <h1>{CompanyName}</h1>
            <p>{CompanyType}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default HexCard;
