import React from "react";

import {ReactComponent as Logo} from "../../bevi_logo_b.svg";

import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <div className="logo-container">
        <Logo className="logo"/>
      </div>
    </nav>
  );
};

export default NavBar;
