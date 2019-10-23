import React from "react";

import "./HexCard.scss";

const HexCard = ({ CompanyName, CompanyType }) => {
  const Back_Url = process.env.REACT_APP_BEVY_API;
  return (
    <li className="hex">
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
