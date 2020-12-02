import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Header from "./components/ui/Header";
import MobileSideNav from "./components/ui/MobileSideNav";
import SimplePayPdf from "./components/PaySlipPdf/PaySlipPdf";
import "./App.css";
import PaymentRunsPdf from "./components/PaymentRunsPdf/PaymentRunsPdf";
import FilingPdf from "./components/FilingPdf/FilingPdf";
import LeaveReportPdf from "./components/LeaveReportPdf/LeaveReportPdf";
import LeaveReportsPdf from "./components/LeaveReporstPdf/LeaveReportsPdf";
import TransactionHistoryPdf from "./components/TrasactionHistoryPdf/TransactionHistoryPdf";
import LoanSavingsPdf from "./components/LoanSavingsPdf/LoanSavingsPdf";
import LeaveLiabilitiesPdf from "./components/LoanSavingsPdf/LoanSavingsPdf";

function App() {
  const [openSideDrawer, setOpenSideDrawer] = useState(false);

  // const a = true;

  return (
    <div className="App">
      <Header openSideNav={() => setOpenSideDrawer(true)} />
      <MobileSideNav
        close={() => setOpenSideDrawer(false)}
        show={openSideDrawer}
      />
      <div className="Body">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/pay-run-pdf" component={SimplePayPdf} />
          <Route path="/pay-slip-pdf" component={PaymentRunsPdf} />
          <Route path="/filing-pdf" component={FilingPdf} />
          <Route path="/leave-report-pdf" component={LeaveReportPdf} />
          <Route path="/leave-reports-pdf" component={LeaveReportsPdf} />
          <Route path="/loan-savings-pdf" component={LoanSavingsPdf} />
          <Route path="/leave-liability-pdf" component={LeaveLiabilitiesPdf} />
          <Route
            path="/transaction-history-pdf"
            component={TransactionHistoryPdf}
          />
          <Route path="/" component={Dashboard} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
