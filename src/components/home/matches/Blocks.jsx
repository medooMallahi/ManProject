import React, { Component } from "react";
import { firbaseMatches } from "../../../firbase";
import { firbaseLooper, reverseArray } from "../../UI/misc";
import MatchesBlock from "../../UI/matches_block";
import Slide from "react-reveal";

class Blocks extends Component {
  state = {
    matches: []
  };

  componentDidMount() {
    firbaseMatches
      .limitToLast(7)
      .once("value")
      .then(response => {
        const matches = firbaseLooper(response);
        this.setState({ matches: reverseArray(matches) });
      });
  }

  showMatches = matches =>
    matches.map(match => (
      <Slide bottom key={match.id}>
        <div className="item">
          <div className="wrapper">
            <MatchesBlock match={match} />
          </div>
        </div>
      </Slide>
    ));
  render() {
    return (
      <div className="home_matches">{this.showMatches(this.state.matches)}</div>
    );
  }
}

export default Blocks;
