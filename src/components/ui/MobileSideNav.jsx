import React from "react";
import { Link, withRouter } from "react-router-dom";
import Backdrop from "./Backdrop";
import "./MobileSideNav.css";

const MobileSideNav = (props) => {
  return (
    <>
      {props.show ? <Backdrop close={props.close} /> : null}
      <div
        onClick={props.close}
        className="MobileSideNav"
        style={{
          transform: props.show ? "translateX(0)" : "translateX(-100vw)",
        }}
      >
        <Link
          className={
            props.history.location.pathname === "/login"
              ? "MobileSideNavActive"
              : ""
          }
          onClick={props.close}
          to="/login"
        >
          Login
        </Link>
        <div>Logout</div>
        <hr />
        <div>
          <Link onClick={props.close} to="/">
            <div
              className={
                props.history.location.pathname === "/"
                  ? "IconText IconTextActive"
                  : "IconText"
              }
            >
              <i className="fas fa-users"></i>
              <p>Employees</p>
            </div>
          </Link>
          <Link onClick={props.close} to="/pay-runs">
            <div
              className={
                props.history.location.pathname === "/pay-runs"
                  ? "IconText IconTextActive"
                  : "IconText"
              }
            >
              <i className="fas fa-dollar-sign"></i>
              <p>Pay Runs</p>
            </div>
          </Link>
          <Link onClick={props.close} to="/filing">
            <div
              className={
                props.history.location.pathname === "/filing"
                  ? "IconText IconTextActive"
                  : "IconText"
              }
            >
              <i className="fab fa-telegram-plane"></i>
              <p>Filing</p>
            </div>
          </Link>
          <Link onClick={props.close} to="/reports">
            <div
              className={
                props.history.location.pathname === "/reports"
                  ? "IconText IconTextActive"
                  : "IconText"
              }
            >
              <i className="far fa-newspaper"></i>
              <p>Reports</p>
            </div>
          </Link>
          <Link onClick={props.close} to="/settings">
            <div
              className={
                props.history.location.pathname === "/settings"
                  ? "IconText IconTextActive"
                  : "IconText"
              }
            >
              <i className="fas fa-cog"></i>
              <p>settings</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default withRouter(MobileSideNav);
