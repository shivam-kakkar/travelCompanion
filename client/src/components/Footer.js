import React from "react";
import facebookImage from "../images/facebook.png";
import twitterImage from "../images/twitter.png";
import linkedinImage from "../images/linkedIn.png";

const Footer = () => {
  return (
    <div id="footer">
      <h3 id="footerTitle">Travel Companion</h3>
      <p></p>
      <p id="privacy">Privacy Policy</p>
      <button id="siteMap" class="btn btn-link">
        Site map
      </button>
      <div id="iconImage">
        <a href="https://www.facebook.com/shivam.kakkar.560">
          <img class="icon" src={facebookImage} />
        </a>
        <a href="https://twitter.com/Shivam90082918">
          <img class="icon" src={twitterImage} />
        </a>
        <a href="https://www.linkedin.com/in/shivam-kakkar-84833b145/">
          <img class="icon" src={linkedinImage} />
        </a>
      </div>
    </div>
  );
};
export default Footer;
