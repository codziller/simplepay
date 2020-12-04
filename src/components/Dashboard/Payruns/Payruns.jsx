import React, { useEffect, useState } from "react";
import "./Payruns.css";
import CardWithHeader from "../../ui/CardWithHeader";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../helpers/API_CONFIG";
import axios from "axios";
import Loading from "../../ui/Loading";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

const convertMonth = (month) => {
  switch (month) {
    case "01":
      return "January";
    case "02":
      return "Feburary";
    case "03":
      return "March";
    case "04":
      return "April";
    case "05":
      return "May";
    case "06":
      return "June";
    case "07":
      return "July";
    case "08":
      return "August";
    case "09":
      return "September";
    case "10":
      return "October";
    case "11":
      return "November";
    case "12":
      return "December";
  }
};

const PendingPay = (props) => (
  <div className="Payrun">
    <div className="PayrunLeft">
      {props.qty ? <p>Show {props.qty} more</p> : null}
      <h3>{props.title}</h3>
      <button className="PayrunBtn" onClick={props.showPayrunModal}>
        Create Pay Run
      </button>
    </div>
    <div className="PayrunRight">
      <p>Payslips</p>
      <div className="PayslipsCount">
        <div className="Total">
          <p className="PayslipCountHeader">Total</p>
          <p className="PayslipCount">{props.payslipCount}</p>
        </div>
        <div className="Finalised">
          <p className="PayslipCountHeader">Finalised</p>
          <p className="PayslipCount">{props.finalisedCount}</p>
          <hr />
          <Link to={"/pay-run-pdf"}>View</Link>
          <hr />
          <a
            onClick={(e) => {
              e.preventDefault();
              props.finalise("False");
            }}
          >
            Unfinalise
          </a>
        </div>
        <div className="Pending">
          <p className="PayslipCountHeader">Pending</p>
          <p className="PayslipCount">{props.unfinaliseCount}</p>
          <hr />
          <Link to={"/pay-run-pdf"}>Preview</Link>
          <hr />
          <a
            onClick={(e) => {
              e.preventDefault();
              props.finalise("True");
            }}
          >
            Finalise
          </a>
        </div>
      </div>
    </div>
  </div>
);

const PaySummary = (props) => (
  <div className="PaySummary">
    <CardWithHeader
      header={
        <div className="SpaceHeader">
          <div>{props.date} Payment Info</div>
          <div>Total ${props.total}</div>
        </div>
      }
    >
      <div className="PaymentTable">
        <div className="PaymentInfoHeader">
          <h4>Payslip</h4>
          <h4>All</h4>
          <h4>Cash</h4>
          <h4>GIRO</h4>
        </div>
        <hr />
        <div className="PaymentInfoBody">
          <div>
            {props.paySlipCount ? (
              <a href="">{props.paySlipCount} Payslips</a>
            ) : null}
          </div>
          <div>
            <div className="PaymentInfoCounter">{props.paySlipCount}</div>
            <Link to="/pay-slip-pdf">
              <i className="far fa-file-pdf"></i>
            </Link>
            <i className="far fa-file-excel"></i>
          </div>
          <div>
            <div className="PaymentInfoCounter">{props.cashCount}</div>
            <Link to="/pay-slip-pdf">
              <i className="far fa-file-pdf"></i>
            </Link>
            <i className="far fa-file-excel"></i>
          </div>
          <div>
            <div className="PaymentInfoCounter">{props.giroCount}</div>
            <Link to="/pay-slip-pdf">
              <i className="far fa-file-pdf"></i>
            </Link>
            <i className="far fa-file-excel"></i>
            <i className="fas fa-file-export"></i>
          </div>
        </div>
        <div className="AccountInfo">
          Account Info:
          <Link to="/pay-slip-pdf">
            <i className="far fa-file-pdf"></i>
          </Link>
          <i className="far fa-file-excel"></i>
        </div>
      </div>
    </CardWithHeader>
  </div>
);

const Payruns = () => {
  const [weeklyPendingLoading, setWeeklyPendingLoading] = useState(false);
  const [monthlyPendingLoading, setMonthlyPendingLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [error, setError] = useState(false);
  const [weeklyPendingPayRuns, setWeeklyPendingPayRuns] = useState();
  const [monthlyPendingPayRuns, setMonthlyPendingPayRuns] = useState();
  const [payslips, setPayslips] = useState();

  const [modal, setModal] = useState(false);
  const [current, setCurrent] = useState();
  const [timeFrame, setTimeFrame] = useState();
  const [payslipIndex, setPayslipIndex] = useState();

  const fetchWeeklyPendingPayRuns = () => {
    setWeeklyPendingLoading(true);
    const url = BASE_URL + "/api/pay-slip/?timeframe=weekly";
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    axios.get(url, { headers: headers }).then((res) => {
      setWeeklyPendingLoading(false);
      setWeeklyPendingPayRuns(res.data);
    });
  };

  const fetchMonthlyPendingPayRuns = () => {
    setMonthlyPendingLoading(true);
    const url = BASE_URL + "/api/pay-slip/?timeframe=monthly";
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    axios.get(url, { headers: headers }).then((res) => {
      setMonthlyPendingLoading(false);
      setMonthlyPendingPayRuns(res.data);
    });
  };

  const fetchPaySlip = () => {
    setPayLoading(true);
    const url = BASE_URL + "/api/pay-run/";
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    axios.get(url, { headers: headers }).then((res) => {
      setPayLoading(false);
      setPayslips(res.data);
    });
  };

  const finalisePaySlips = (date, type) => {
    const url = BASE_URL + "/api/pay-slip/";
    const data = {
      pay_date: date,
      finalize: type,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    axios.post(url, data, { headers: headers }).then(() => {
      fetchMonthlyPendingPayRuns();
      fetchWeeklyPendingPayRuns();
    });
  };

  const createpayRun = () => {
    const url = BASE_URL + "/api/pay-run/";
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    let data = {};
    let payslips = [];
    if (timeFrame === "weekly") {
      data.name = weeklyPendingPayRuns[payslipIndex].date;
      console.log(weeklyPendingPayRuns[payslipIndex]);
      for (let payRun of weeklyPendingPayRuns[payslipIndex].data) {
        payslips.push(payRun.id);
      }
    } else {
      data.name = monthlyPendingPayRuns[payslipIndex].date;
      for (let payRun of monthlyPendingPayRuns[payslipIndex].data) {
        payslips.push(payRun.id);
      }
    }
    data["payslips"] = payslips;
    axios.post(url, data, { headers: headers }).then(() => {
      setModal(false);
      fetchPaySlip();
      if (timeFrame === "weekly") {
        fetchWeeklyPendingPayRuns();
      } else {
        fetchMonthlyPendingPayRuns();
      }
    });
  };

  useEffect(() => {
    fetchWeeklyPendingPayRuns();
    fetchMonthlyPendingPayRuns();
    fetchPaySlip();
  }, []);

  let monthlyPendingContent;
  let weeklyPendingContent;
  let isLoading;
  let payslipContent;
  if (payLoading || monthlyPendingLoading || weeklyPendingLoading) {
    isLoading = <Loading />;
  } else {
    isLoading = null;
    if (weeklyPendingPayRuns) {
      weeklyPendingContent = weeklyPendingPayRuns.map((data, i) => (
        <PendingPay
          key={i}
          payslipCount={data.total}
          finalisedCount={data.finalized}
          unfinaliseCount={data.pending}
          title={`The Week ending on Wednesday ${
            data.date.split("-")[2]
          } ${convertMonth(data.date.split("-")[1])} ${
            data.date.split("-")[0]
          }`}
          finalise={(type) => finalisePaySlips(data.date, type)}
          showPayrunModal={() => {
            setModal(true);
            setCurrent("Create Pay Run: Weekly - " + data.date);
            setTimeFrame("weekly");
            setPayslipIndex(i);
          }}
        />
      ));
    }
    if (monthlyPendingPayRuns) {
      monthlyPendingContent = monthlyPendingPayRuns.map((data, i) => (
        <PendingPay
          key={i}
          payslipCount={data.total}
          finalisedCount={data.finalized}
          unfinaliseCount={data.pending}
          title={`The Month ending on 31st ${convertMonth(
            data.date.split("-")[1]
          )} ${data.date.split("-")[0]}`}
          finalise={(type) => finalisePaySlips(data.date, type)}
          showPayrunModal={() => {
            setModal(true);
            setCurrent("Create Pay Run: Monthly - " + data.date);
            setTimeFrame("monthly");
            setPayslipIndex(i);
          }}
        />
      ));
    }
    if (payslips) {
      payslipContent = payslips.map((data, i) => (
        <PaySummary
          key={i}
          date={data.date}
          total={data.sum}
          paySlipCount={data.all}
          cashCount={data.cash}
          giroCount={data.giro}
        />
      ));
    }
  }
  return (
    <div className="Payruns">
      <Modal show={modal} close={() => setModal(false)}>
        <h3>{current}</h3>
        <hr />
        <p>Please confirm pay run creation.</p>
        <hr />
        <Button title="Create" onClick={() => createpayRun()} />
      </Modal>
      {isLoading}
      <h1>Pay Runs</h1>
      <CardWithHeader
        header={<div className="SpaceHeader">Pending Pay Runs</div>}
      >
        {weeklyPendingContent}
        {monthlyPendingContent}
      </CardWithHeader>

      {payslipContent}
      <div className="ShowMore">Show Older Pay Runs</div>
    </div>
  );
};

export default Payruns;
