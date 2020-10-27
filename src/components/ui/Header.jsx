import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = (props) => (
  <div className="HeaderContainer">
    <div className="Container">
      <div className="Header">
        <div className="Menu" onClick={props.openSideNav}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="Logo">SIMPLE PAY</div>
        <div className="HeaderNav">
          <Link to="/">Home</Link>
          <Link to="/">Login</Link>
          <Link to="/">Signup</Link>
          <div>Logout</div>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
