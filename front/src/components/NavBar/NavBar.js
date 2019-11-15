import React from "react";
import { Link } from "react-router-dom";

//Importing Logo as component
import { ReactComponent as Logo } from "../../bevi_logo_b.svg";

import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <Link to="/companies">
        <div className="logo-container">
          <Logo className="logo" />
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
