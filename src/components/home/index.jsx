import React from "react";
import Featured from "./featured/index";
import MatchesHome from "./matches/index";
import MeetPlayers from "./meetPlayers/index";
import Promation from "./promotion/index";

const Home = props => {
  return (
    <div className="bck_blue">
      <Featured />
      <MatchesHome />
      <MeetPlayers />
      <Promation />
    </div>
  );
};

export default Home;
