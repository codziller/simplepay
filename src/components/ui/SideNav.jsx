import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./SideNav.css";

const SideNav = ({ history }) => {
  return (
    <div className="SideNav">
      <Link to="/">
        <div
          className={
            history.location.pathname === "/"
              ? "IconText IconTextActive"
              : "IconText"
          }
        >
          <i className="fas fa-users"></i>
          <p>Employees</p>
        </div>
      </Link>
      <Link to="/pay-runs">
        <div
          className={
            history.location.pathname === "/pay-runs"
              ? "IconText IconTextActive"
              : "IconText"
          }
        >
          <i className="fas fa-dollar-sign"></i>
          <p>Pay Runs</p>
        </div>
      </Link>
      <Link to="/filing">
        <div
          className={
            history.location.pathname === "/filing"
              ? "IconText IconTextActive"
              : "IconText"
          }
        >
          <i className="fab fa-telegram-plane"></i>
          <p>Filing</p>
        </div>
      </Link>
      <Link to="/reports">
        <div
          className={
            history.location.pathname === "/reports"
              ? "IconText IconTextActive"
              : "IconText"
          }
        >
          <i className="far fa-newspaper"></i>
          <p>Reports</p>
        </div>
      </Link>
      <Link to="/settings">
        <div
          className={
            history.location.pathname === "/settings"
              ? "IconText IconTextActive"
              : "IconText"
          }
        >
          <i className="fas fa-cog"></i>
          <p>settings</p>
        </div>
      </Link>
    </div>
  );
};
export default withRouter(SideNav);
