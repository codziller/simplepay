import React from "react";
import { Route, Switch } from "react-router-dom";
import SideNav from "../ui/SideNav";
import "./Dashboard.css";
import Employee from "./Employee/Employee";

const Dashboard = () => {
  return (
    <div className="Container">
      <div className="Dashboard">
        <SideNav />
        <div className="DashboardMain">
          <Switch>
            <Route exact path="/" component={Employee} />
          </Switch>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
