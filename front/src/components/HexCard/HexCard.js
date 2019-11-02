import React from "react";

import "./HexCard.scss";
import "../../public styles/HexIntro.scss";

/**
 *
 * @param {array} CompanyName
 * @param {string} CompanyType
 * @param {cssModule} hexModuleCss - executes this css module you added to the hex selector
 */
const HexCard = ({ CompanyName, CompanyType, hexModuleCss }) => {
  //simplifying the procces.env variable
  const Back_Url = process.env.REACT_APP_BEVY_API;

  return (
    <li className={`${hexModuleCss.hex} hex`}>
      <div className="hexIn">
        <div className="hexLink">
          <img
            className="hexImage"
            src={`${Back_Url}/companylogos/${CompanyName}.png`}
            alt={`Company Logo of ${CompanyName}`}
            width="100px"
          />
          <h1>{CompanyName}</h1>
          <p>{CompanyType}</p>
        </div>
      </div>
    </li>
  );
};

export default HexCard;
