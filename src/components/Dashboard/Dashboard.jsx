import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SideNav from "../ui/SideNav";
import "./Dashboard.css";
import Employee from "./Employee/Employee";
import EmployeeDetail from "./Employee/EmployeeDetail/EmployeeDetail";
import Filing from "./Filing/Filing";
import Payruns from "./Payruns/Payruns";
import EmployeeInfo from "./Reports/EmployeeInfo";
import LeaveDaysReport from "./Reports/LeaveDaysReport";
import LeaveLiability from "./Reports/LeaveLiability";
import LeaveReport from "./Reports/LeaveReport";
import LoanSavings from "./Reports/LoanSavings";
import Reports from "./Reports/Reports";
import TransactionReport from "./Reports/TransactionReport";
import VarianceReport from "./Reports/VarianceReport";

const Dashboard = () => {
  return (
    <div className="Container">
      {localStorage.getItem("access_token") ? (
        <div className="Dashboard">
          <SideNav />
          <div className="DashboardMain">
            <Switch>
              <Route path="/reports/employee-info" component={EmployeeInfo} />
              <Route
                path="/reports/leave-days-report"
                component={LeaveDaysReport}
              />
              <Route path="/reports/leave-report" component={LeaveReport} />
              <Route
                path="/reports/transaction-report"
                component={TransactionReport}
              />
              <Route
                path="/reports/variance-report"
                component={VarianceReport}
              />
              <Route path="/reports/balances" component={LoanSavings} />
              <Route
                path="/reports/leave-liability"
                component={LeaveLiability}
              />
              <Route path="/reports" component={Reports} />
              <Route path="/employee/:id" component={EmployeeDetail} />
              <Route path="/pay-runs" component={Payruns} />
              <Route path="/filing" component={Filing} />
              <Route exact path="/" component={Employee} />
            </Switch>
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};
export default Dashboard;
