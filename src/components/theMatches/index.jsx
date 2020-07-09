import React, { Component } from "react";
import LeagueTable from "./LeagueTable";
import MatchesList from "./matchesList";
import CircularProgress from "@material-ui/core/CircularProgress";
import { firbaseMatches } from "../../firbase";
import { firbaseLooper, reverseArray } from "../UI/misc";

export default class TheMatches extends Component {
  state = {
    loading: true,
    matches: [],
    filterMatches: [], // to prevent modifing the one on the Top
    playerFilter: "All",
    resultFilter: "All"
  };
  componentDidMount() {
    firbaseMatches.once("value").then(res => {
      const matches = firbaseLooper(res);
      this.setState({
        loading: false,
        matches: reverseArray(matches),
        filterMatches: reverseArray(matches)
      });
    });
  } // end of Cpmpnent didMount

  showPlayed = played => {
    const list = this.state.matches.filter(match => match.final === played);
    this.setState({
      filterMatches: played === "All" ? this.state.matches : list,
      playerFilter: played,
      resultFilter: "All"
    });
  };

  showResult = result => {
    const list = this.state.matches.filter(match => match.result === result);
    this.setState({
      filterMatches: result === "All" ? this.state.matches : list,
      playerFilter: "All",
      resultFilter: result
    });
  };
  render() {
    const {
      loading,
      matches,
      filterMatches,
      playerFilter,
      resultFilter
    } = this.state;
    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">
              <div className="match_filters_box">
                <div className="tag">show match</div>
                <div className="cont">
                  <div
                    className={`option ${
                      this.state.playerFilter === "All" ? "active" : ""
                    }`}
                    onClick={() => this.showPlayed("All")}
                  >
                    All
                  </div>
                  <div
                    className={`option ${
                      this.state.playerFilter === "Yes" ? "active" : ""
                    }`}
                    onClick={() => this.showPlayed("Yes")}
                  >
                    played
                  </div>
                  <div
                    className={`option ${
                      this.state.playerFilter === "No" ? "active" : ""
                    }`}
                    onClick={() => this.showPlayed("No")}
                  >
                    Not played
                  </div>
                </div>
              </div>

              <div className="match_filters_box">
                <div className="tag">Result game</div>
                <div className="cont">
                  <div
                    className={`option ${
                      this.state.resultFilter === "All" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("All")}
                  >
                    All
                  </div>
                  <div
                    className={`option ${
                      this.state.resultFilter === "W" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("W")}
                  >
                    W
                  </div>
                  <div
                    className={`option ${
                      this.state.resultFilter === "L" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("L")}
                  >
                    L
                  </div>
                  <div
                    className={`option ${
                      this.state.resultFilter === "D" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("D")}
                  >
                    D
                  </div>
                </div>
              </div>
            </div>
            <MatchesList matches={filterMatches} />
          </div>
          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    );
  }
}
