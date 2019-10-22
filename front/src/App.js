import React from "react";

import { Route, Switch, withRouter } from "react-router-dom";

//----------------IMPORT COMPONENTS------------------
import NavBar from "./components/NavBar/NavBar.js";
import LandingPage from "./pages/LandingPage/LandingPage.js";
import CompanyDetails from "./pages/CompanyDetails/CompanyDetails.js";
//----------------IMPORT COMPONENTS------------------

import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route
          path="/"
          exact={true}
          render={() => {
            return <LandingPage />;
          }}
        />

        <Route
          path="/company/:id"
          render={() => {
            return <CompanyDetails />;
          }}
        />
      </Switch>
    </div>
  );
}

export default withRouter(App);
