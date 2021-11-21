import React from "react";

import { Route, withRouter } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import { shuffleCompanies } from "./utils/shuffleCompanies";
import { GetCompanyData, GetCompanyTypes } from "./BackEndController/BackendAPI.js";

//----------------IMPORT COMPONENTS------------------
import NavBar from "./components/NavBar/NavBar.js";
import LandingPage from "./pages/LandingPage/LandingPage.js";
import CompaniesPage from "./pages/CompaniesPage/CompaniesPage.js";
import CompanyDetails from "./pages/CompanyDetails/CompanyDetails.js";
import NotFoundPage from "./pages/404Page/NotFoundPage.js"
//----------------IMPORT COMPONENTS------------------


import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      CompanyData: [],
      CompanyTypes: [],
      TypeData: ""
    };
  }
  // storing backend Url in readable variable
  // Back_Url = process.env.REACT_APP_BEVY_API;

  componentDidMount = async () => {
    GetCompanyData(this.OnRecieveCompanyData);
    GetCompanyTypes(this.OnRecieveCompanyTypes);
  };

  OnRecieveCompanyData = (data) => {
    const shuffledData = shuffleCompanies(data.Companies);
    this.setState({ CompanyData: shuffledData });
  }

  OnRecieveCompanyTypes = data => {
    const shuffledData = await shuffleCompanies(data.CompanyTypes);
    this.setState({ CompanyTypes: shuffledData });
  }


  render() {
    const { CompanyData, CompanyTypes } = this.state;
    return (
      <div className="App">
        <NavBar />
        <AnimatedSwitch atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper">
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
              return <CompaniesPage CompanyData={CompanyData} CompanyTypes={CompanyTypes} {...props} />;
            }}
          />

          <Route
            path="/company/:id?"
            render={(props) => {
              return <CompanyDetails {...props} />;
            }}
          />

          <Route render={() => {
            return <NotFoundPage />
          }} />
        </AnimatedSwitch>
      </div>
    );
  }
}
export default withRouter(App);
