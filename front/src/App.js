import React from "react";

import { Route, Switch, withRouter } from "react-router-dom";
import { shuffleCompanies } from "./utils/shuffleCompanies";

//----------------IMPORT COMPONENTS------------------
import NavBar from "./components/NavBar/NavBar.js";
import LandingPage from "./pages/LandingPage/LandingPage.js";
import CompaniesPage from "./pages/CompaniesPage/CompaniesPage.js";
import CompanyDetails from "./pages/CompanyDetails/CompanyDetails.js";
//----------------IMPORT COMPONENTS------------------

import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CompanyData: [],
      CompanyTypes: [],
      TypeData: ""
    };
  }
  // storing backend Url in readable variable
  Back_Url = process.env.REACT_APP_BEVY_API;

  componentDidMount = async () => {
    await this.getCompanyData();
    await this.getCompanyTypes();
  };

  /**
   * @function getCompanyData - fetches all Company Data From DB
   */
  getCompanyData = async () => {
    try {
      const req = await fetch(`${this.Back_Url}/companies`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const res = await req.json();
      const shuffledData = await shuffleCompanies(res.Companies);
      this.setState({ CompanyData: shuffledData });
    } catch (err) {
      throw new Error(`Failed to fetch company Data with = ${err}`);
    }
  };

  getCompanyTypes = async () => {
    try {
      const req = await fetch(`${this.Back_Url}/companies/types`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const res = await req.json();
      const shuffledData = await shuffleCompanies(res.CompanyTypes);
      this.setState({ CompanyTypes: shuffledData });
    } catch (err) {
      throw new Error(`Failed to fetch company Types Data with = ${err}`);
    }
  };

  render() {
    const { CompanyData, CompanyTypes } = this.state;
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route
            path="/"
            exact={true}
            render={() => {
              return (
                <LandingPage
                  CompanyData={CompanyData}
                  CompanyTypes={CompanyTypes}
                />
              );
            }}
          />

          <Route
            path={["/companies/:id", "/companies"]}
            render={props => {
              return <CompaniesPage CompanyData={CompanyData} {...props} />;
            }}
          />

          <Route
            path="/company/:id?"
            render={() => {
              return <CompanyDetails />;
            }}
          />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);
