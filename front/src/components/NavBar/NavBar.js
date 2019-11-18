import React from "react";
import { Link } from "react-router-dom";

//Importing Logo as component
import { ReactComponent as Logo } from "../../bevi_logo_b.svg";

import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <div className="logo-container">
        <Link to="/companies">
          <Logo className="logo" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
