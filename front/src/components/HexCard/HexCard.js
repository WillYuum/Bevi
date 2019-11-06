import React from "react";

import hexCard from "./HexCard.module.scss";
import HexIntro from "../../public styles/HexIntro.module.scss";

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
    <li className={`${hexModuleCss} ${hexCard.hex} ${HexIntro.hex}`}>
      <div className={hexCard.hexIn}>
        <div className={hexCard.hexLink}>
          <img
            className={hexCard.img}
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
