import React, { Component } from "react";
import Stripes from "../../../Resources/images/stripes.png";
import { Tag } from "../../UI/misc";
import Reveal from "react-reveal/Reveal";
import HomeCards from "./cards";
export default class MeetPlayers extends Component {
  state = {
    show: false
  };
  render() {
    return (
      <Reveal
        fraction={0.7}
        onReveal={() => {
          this.setState({ show: true });
        }}
      >
        <div
          className="home_meetplayers"
          style={{ background: `#ffffff url(${Stripes}) ` }}
        >
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
                <HomeCards show={this.state.show} />
              </div>
              <div className="home_text_wrapper">
                <div style={{ display: "inline-block", marginBottom: "20px" }}>
                  <Tag bck="#0e1731" size="100px" color="#ffffff">
                    Meet
                  </Tag>
                </div>
                <div style={{ marginBottom: "27px" }}>
                  <Tag bck="#0e1731" size="100px" color="#ffffff">
                    The
                  </Tag>
                </div>
                <div style={{ display: "inline-block", marginBottom: "27px" }}>
                  <Tag
                    bck="#ffffff"
                    size="27px"
                    color="#0e1731"
                    link={true}
                    linkto="/the-team"
                  >
                    Meet Them here
                  </Tag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }
}
