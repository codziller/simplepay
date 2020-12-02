import React from "react";
import { Link, withRouter } from "react-router-dom";
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
          {localStorage.getItem("access_token") ? (
            <Link to="/">Home</Link>
          ) : null}
          {!localStorage.getItem("access_token") ? (
            <Link to="/login">Login</Link>
          ) : null}
          {localStorage.getItem("access_token") ? (
            <div
              onClick={() => {
                localStorage.clear();
                props.history.replace("/login");
              }}
            >
              Logout
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </div>
);

export default withRouter(Header);
