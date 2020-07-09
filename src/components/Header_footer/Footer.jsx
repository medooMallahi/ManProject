import React from "react";
import { CityLogo } from "../UI/icons";

const Footer = props => {
  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <CityLogo link={true} linkTo="/" width="70px" height="70px" />
      </div>
      <div className="footer_discl">Manchester City 2020</div>
    </footer>
  );
};

export default Footer;
