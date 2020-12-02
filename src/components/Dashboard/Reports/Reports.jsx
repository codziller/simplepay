import React from "react";
import { Link } from "react-router-dom";
import CardWithHeaders from "../../ui/CardWithHeader";
import "./Reports.css";

const generalList = [
  { url: "/reports/employee-info", title: "Employee Basic Info" },
  { url: "/reports/leave-days-report", title: "Leave Days Report" },
  { url: "/reports/leave-report", title: "Leave Report" },
  { url: "/reports/transaction-report", title: "Transaction History Report" },
  { url: "/reports/variance-report", title: "Variance Report" },
];

const financialList = [
  { url: "/reports/balances", title: "Balances - Loans and Savings" },
  { url: "/reports/leave-liability", title: "Leave Liabilities" },
];

const Reports = (props) => {
  return (
    <div className="Reports">
      <h1>Reports</h1>
      <div className="ReportContainer">
        <CardWithHeaders header="General">
          <div className="ReportLists">
            {generalList.map((val, i) => (
              <Link key={i} to={val.url} className="ReportList">
                {val.title}
              </Link>
            ))}
          </div>
        </CardWithHeaders>
        <CardWithHeaders header="Financial">
          <div className="ReportLists">
            {financialList.map((val, i) => (
              <Link key={i} to={val.url} className="ReportList">
                {val.title}
              </Link>
            ))}
          </div>
        </CardWithHeaders>
      </div>
    </div>
  );
};

export default Reports;
