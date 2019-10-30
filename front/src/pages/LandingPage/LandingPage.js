import React from "react";

import { Link } from "react-router-dom";

//----------------IMPORT COMPONENTS------------------
import HexMap from "../../map-component/HexMap/HexMap.js";
import FilterMap from "../../map-component/FilterMap/FilterMap.js";
//----------------IMPORT COMPONENTS------------------

import "./LandingPage.scss";
import "./ShowAllIntro.scss";
import "../../public styles/Hex-Grid.scss"

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { CompanyData } = this.props;
    return (
      <div className="LandingPage-container">
        <div className="Bevi-introCotntainer">
          <h1>A Collection of All Tech Companies in Lebanon</h1>
          <small>Search for your fitting tech company with ease!</small>
        </div>
        <div className="content-container">
          <div className="featuredCompanies-container">
            <h2>Featured Companies</h2>
            <div className="featuredCompanies-grid hexGrid">
              <HexMap CompanyData={CompanyData} hexAmount="7" />
            </div>
          </div>
          <div className="QuickSearch-container">
            <h2>Quick Search</h2>
            <div className="QuickSearch-grid hexGrid"></div>
          </div>
        </div>
        <div className="StartSearching">
          <Link className="text" to="/companies">
            <button>Start Searching</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default LandingPage;
