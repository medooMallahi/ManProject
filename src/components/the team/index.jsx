import React, { Component } from "react";
import PlayerCard from "../UI/playerCard";
import Fade from "react-reveal/Fade";
import Stripes from "../../Resources/images/stripes.png";

import { firebase, firbasePlayers } from "../../firbase";
import { firbaseLooper } from "../UI/misc";
import { Promise } from "core-js";

export default class TheTeam extends Component {
  state = {
    loadding: true,
    players: []
  };
  componentDidMount() {
    firbasePlayers
      .once("value")
      .then(res => {
        const players = firbaseLooper(res);
        console.log(players);
        let promises = [];
        players.forEach((key, i) => {
          //key => actual player
          //i -> itration number
          promises.push(
            new Promise((resolve, reject) => {
              // you will access the storge if you are logged in only so go to rules and change it
              firebase
                .storage()
                .ref("players")
                .child(players[i].image)
                .getDownloadURL()
                .then(url => {
                  //add new property the every player and call it url
                  players[i].url = url;
                  resolve();
                })
                .catch(err => {
                  console.log("Error with featching image URl");
                });
            })
          );
        }); // end of forEach
        //And whenever all the promises gets resolved then we're going to do something.
        Promise.all(promises).then(() => {
          this.setState({
            loadding: false,
            players
          });
        });
      }) // end of  first then
      .catch(err => {
        console.log("error while fetching players in TheTeam");
      });
  } // end of component did mount
  showplayersByCatergory = catergory =>
    this.state.players
      ? this.state.players.map((player, i) => {
          return player.position === catergory ? (
            <Fade delay={i * 40} left key={i}>
              <div className="item">
                <PlayerCard
                  number={player.number}
                  name={player.name}
                  lastname={player.lastname}
                  bck={player.url}
                />
              </div>
            </Fade>
          ) : null;
        })
      : null;
  render() {
    return (
      <div
        className="the_team_container"
        style={{ background: `url(${Stripes}) repeat` }}
      >
        {!this.state.loadding ? (
          <div>
            <div className="team_category_wrapper">
              <div className="title">Keepers</div>
              <div className="team_cards">
                {this.showplayersByCatergory("Keeper")}
              </div>
            </div>
            <div className="team_category_wrapper">
              <div className="title">Defence</div>
              <div className="team_cards">
                {this.showplayersByCatergory("Defence")}
              </div>
            </div>
            <div className="team_category_wrapper">
              <div className="title">Midfield</div>
              <div className="team_cards">
                {this.showplayersByCatergory("Midfield")}
              </div>
            </div>
            <div className="team_category_wrapper">
              <div className="title">Strikers</div>
              <div className="team_cards">
                {this.showplayersByCatergory("Striker")}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
