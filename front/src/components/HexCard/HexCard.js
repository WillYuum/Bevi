import React from "react";

import "./HexCard.scss";

const HexCard = ({ CompanyName, CompanyType }) => {
  return (
    <li className="hex">
      <div className="hexIn">
        <div className="hexLink">
          <img
            className="hexImage"
            src={`http://localhost:3001/public/companylogos/${CompanyName}.png`}
            alt={`Company Logo of ${CompanyName}`}
            width="100px"
          />
          {/* <h5>{CompanyType}</h5> */}
        </div>
      </div>
    </li>
  );
};

export default HexCard;
