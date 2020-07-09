import React from "react";
import { Tag } from "../../UI/misc"; // we use these {} because we donn't use export default so that means we exports mant things from that file
import Blocks from "./Blocks";
const MatchesHome = () => {
  return (
    <div className="home_matches_wrapper">
      {/*  To Centre the elements*/}
      <div className="container">
        <Tag bck="#0e1731" size="50px" color="#ffffff">
          Matches
        </Tag>
        <Blocks />
        <Tag
          bck="#ffffff"
          size="22px"
          color="#0e1731"
          link={true}
          linkto="/the_team"
        >
          See more matches
        </Tag>
      </div>
    </div>
  );
};

export default MatchesHome;
