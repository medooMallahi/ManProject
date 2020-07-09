import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/home/index";
import SignIn from "./components/signin/index";
import Dashboard from "./components/admin/Dashboard";
import AdminMatches from "./components/admin/matches/index";
import AddEditMatch from "./components/admin/matches/addEditMatch";
import AdminPlayers from "./components/admin/players/index";
import AddEditPlayer from "./components/admin/players/addEditPlayer";
import TheTeam from "./components/the team/index";
import TheMatches from "./components/theMatches/index";
import PrivateRoute from "./components/authRoutes/privateRoutes";

export default class App extends Component {
  state = {};

  render() {
    return (
      <Layout>
        <Switch>
          <PrivateRoute
            {...this.props}
            exact
            component={AddEditPlayer}
            path="/admin_players/add_players"
          />
          <PrivateRoute
            {...this.props}
            exact
            component={AddEditPlayer}
            path="/admin_players/add_players/:id"
          />

          <PrivateRoute
            exact
            path="/admin_players"
            component={AdminPlayers}
            {...this.props} // this.props is the user passed from index.js
          />

          <PrivateRoute
            {...this.props}
            exact
            component={AddEditMatch}
            path="/admin_matches/edit_match/:id"
          />
          <PrivateRoute
            {...this.props}
            exact
            component={AddEditMatch}
            path="/admin_matches/edit_match"
          />
          <PrivateRoute
            exact
            path="/admin_matches"
            component={AdminMatches}
            {...this.props} // this.props is the user passed from index.js
          />
          <PrivateRoute
            {...this.props}
            exact
            component={Dashboard}
            path="/dashboard"
          />
          <Route exact component={TheMatches} path="/the_matches" />
          <Route exact component={TheTeam} path="/the_team" />
          <Route exact component={SignIn} path="/sign_in" />
          <Route exact component={Home} path="/" />
          <Redirect to="/sign_in" />
        </Switch>
      </Layout>
    );
  }
}
