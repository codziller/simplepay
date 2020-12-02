import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import CardWithHeaders from "../../../../ui/CardWithHeader";
import EmployeeChart from "../../../../ui/EmployeeChart";
import Loading from "../../../../ui/Loading";
import "./Payroll.css";

const Row = (props) => (
  <>
    {props.title ? <Link to={props.link}>{props.title}</Link> : null}
    <br />
    {props.list
      ? props.list.map((item, i) => (
          <div key={i} className="SpaceKeyValue">
            <div style={{ fontWeight: item.bold ? "bold" : "normal" }}>
              {item.key_}
            </div>
            <div style={{ fontWeight: item.bold ? "bold" : "normal" }}>
              {item.value}
            </div>
          </div>
        ))
      : null}
    <hr />
  </>
);

const Payroll = (props) => {
  let payslipInputs = null;
  if (props.data) {
    if (props.data.salary_detail) {
      if (props.data.salary_detail.current_pay_slip) {
        if (props.data.salary_detail.current_pay_slip.pay_date) {
          payslipInputs = props.data.salary_detail.current_pay_slip.pay_date;
        }
      }
    }
  }
  let content;
  if (props.loading) {
    content = <Loading />;
  } else if (props.data) {
    content = (
      <>
        <p>
          <b>Pay Frequency:</b>{" "}
          {props.data.pay_frequency === "weekly"
            ? "Weekly, ending on Wednesday"
            : "Monthly, ending on the 31st"}
          , <b>Payment method:</b>
          {props.data.payment_method}, <b>Number:</b> {props.id}
        </p>
        <div className="PayrollCards">
          <CardWithHeaders
            header={
              <div className="RegularInputsHeader">
                <p>Regular Inputs</p>
                <div>Add</div>
              </div>
            }
          >
            {props.data.salary_detail ? (
              <>
                <Row
                  link="/calculations/edit/id"
                  title="Basic Salary"
                  list={[
                    { key_: "Fixed Amount", value: props.data.basic_salary },
                  ]}
                />
                <>
                  <Row
                    link="/"
                    title="Employer Loan"
                    list={[
                      {
                        key_: "Interest Rate",
                        value: props.data.salary_detail.interest_rate + "%",
                      },
                      {
                        key_: "Regular Payment",
                        value: props.data.salary_detail.regular_repayment,
                      },
                    ]}
                  />
                  <Row
                    link="/"
                    title="Savings"
                    list={[
                      {
                        key_: "Regular deduction",
                        value: props.data.salary_detail.regular_deduction,
                      },
                    ]}
                  />
                  <Row
                    link="/"
                    title="FWL"
                    list={[
                      {
                        key_: "Amount",
                        value: props.data.salary_detail.flw_amount,
                      },
                    ]}
                  />
                </>
                <Row link="/" title="Monthly Commission" />
                <Row
                  link="/"
                  title="Pension"
                  list={[
                    { key_: "Calculations", value: "Fixed amount per period" },
                    {
                      key_: "Fixed Contribution by Employee",
                      value: "$1,000.00",
                    },
                    {
                      key_: "Fixed Contribution by Employer",
                      value: "$1,000.00",
                    },
                  ]}
                />
                <>
                  <Row
                    title="CPF at Higher Rates"
                    link="/"
                    list={[
                      {
                        key_: "Contribution",
                        value: props.data.salary_detail.contribution,
                      },
                      {
                        key_: "Date effective",
                        value: props.data.salary_detail.date_effective,
                      },
                    ]}
                  />
                  <Row
                    title="SHARE"
                    link="/"
                    list={[
                      {
                        key_: "Employee Amount",
                        value: props.data.salary_detail.employee_amount,
                      },
                      {
                        key_: "Employer Amount",
                        value: props.data.salary_detail.employer_amount,
                      },
                    ]}
                  />
                </>
              </>
            ) : (
              <p>There are no Regular Inputs</p>
            )}
            <Link to="/">Self-Help Group Funds</Link>
          </CardWithHeaders>
          <CardWithHeaders
            header={
              <div className="RegularInputsHeader">
                <p>
                  Payslip Inputs:
                  {payslipInputs}
                </p>
                <div>Add</div>
              </div>
            }
          >
            {props.data.salary_detail ? (
              <>
                <Row
                  title="Employer Loan"
                  link="/"
                  list={[
                    { key_: "Balance Increase", value: "" },
                    { key_: "Once-Off Repayment", value: "" },
                    { key_: "Closing balance", value: "$200.00" },
                  ]}
                />
                <Row title="Leave Paid Out" link="/" />
                <Row
                  title="Termination Lump Sums"
                  link="/"
                  list={[
                    {
                      key_: "Gratuity input",
                      value: props.data.salary_detail.current_pay_slip
                        ? "$" +
                          props.data.salary_detail.current_pay_slip
                            .gratuity_input
                        : null,
                    },
                    {
                      key_: "Notice pay input",
                      value: props.data.salary_detail.current_pay_slip
                        ? "$" +
                          props.data.salary_detail.current_pay_slip
                            .notice_pay_input
                        : null,
                    },
                    {
                      key_: "Ex gratia input",
                      value: props.data.salary_detail.current_pay_slip
                        ? "$" +
                          props.data.salary_detail.current_pay_slip
                            .ex_gratia_input
                        : null,
                    },
                    {
                      key_: "Termination others input",
                      value: props.data.salary_detail.current_pay_slip
                        ? "$" +
                          props.data.salary_detail.current_pay_slip
                            .termination_others_input
                        : null,
                    },
                    { key_: "Compensation for Loss of Office", value: "" },
                    {
                      key_: "Amount",
                      value: props.data.salary_detail.current_pay_slip
                        ? "$" +
                          props.data.salary_detail.current_pay_slip
                            .compensation_for_loss_of_office
                        : null,
                    },
                  ]}
                />
                <Row
                  title="Non-Monthly Commission"
                  link="/"
                  list={[
                    {
                      key_: "Amount",
                      value: props.data.salary_detail.current_pay_slip
                        ? "$" +
                          props.data.salary_detail.current_pay_slip
                            .non_monthly_commission
                        : null,
                    },
                  ]}
                />
                <Row
                  title="Income Paid Out After Tax Clearance"
                  link="/"
                  list={[
                    {
                      key_: "Amount",
                      value: props.data.salary_detail.current_pay_slip
                        ? "$" +
                          props.data.salary_detail.current_pay_slip
                            .income_after_tax
                        : null,
                    },
                  ]}
                />
                <Row
                  title="CPF Adjustment"
                  link="/"
                  list={[
                    {
                      key_: "Employee Amount",
                      value: props.data.salary_detail.current_pay_slip
                        ? "$" +
                          props.data.salary_detail.current_pay_slip
                            .employee_amount
                        : null,
                    },
                    {
                      key_: "Employer Amount",
                      value: props.data.salary_detail.current_pay_slip
                        ? "$" +
                          props.data.salary_detail.current_pay_slip
                            .employer_amount
                        : null,
                    },
                  ]}
                />
                <Row
                  title="Income Withheld (Tax Clearance)"
                  link="/"
                  list={[
                    {
                      key_: "Amount",
                      value: props.data.salary_detail.current_pay_slip
                        ? "$" +
                          props.data.salary_detail.current_pay_slip
                            .income_withheld
                        : null,
                    },
                  ]}
                />
                <Row
                  title="Savings"
                  link="/"
                  list={[
                    { key_: "Balance Increase", value: "" },
                    { key_: "Once-off Deduction", value: "" },
                    { key_: "Closing Balance", value: "$200.00" },
                  ]}
                />
                <Row
                  title="Monthly Commission"
                  link="/"
                  list={[{ key_: "Amount", value: "" }]}
                />
                <Row
                  title="Annual Bonus"
                  link="/"
                  list={[
                    {
                      key_: "Amount",
                      value: props.data.salary_detail.current_pay_slip
                        ? "$" +
                          props.data.salary_detail.current_pay_slip.annual_bonus
                        : null,
                    },
                  ]}
                />
              </>
            ) : (
              <p>There are no payslip-specific inputs for this payslip.</p>
            )}
          </CardWithHeaders>
          <CardWithHeaders
            header={
              <div className="RegularInputsHeader">
                <p>Payslip</p>
                <div>
                  14 Oct 2020 <i className="fas fa-sort-down"></i>
                </div>
              </div>
            }
          >
            {props.data.salary_detail ? (
              <>
                <Row
                  list={[
                    { key_: "Income", value: "0", bold: true },
                    { key_: "Basic Salary", value: "18,000.00" },
                    { key_: "Annual Bonus", value: "2,000.00" },
                    { key_: "Leave Paid Out", value: "54,000.00" },
                    {
                      key_: "Income Paid Out After Tax Clearance",
                      value: "200.00",
                    },
                    {
                      key_: "Non-Monthly Commission",
                      value: props.data.salary_detail.current_pay_slip
                        ? "$" +
                          props.data.salary_detail.current_pay_slip
                            .income_after_tax
                        : null,
                    },
                  ]}
                />
                <Row
                  list={[
                    { key_: "Deduction", value: "13,200.00", bold: true },
                    {
                      key_: "Income Withheld Pending Tax Clearance",
                      value: "1,000.00",
                    },
                    { key_: "SHARE - Employee", value: "200.00" },
                    { key_: "Savings Deduction", value: "1,000.00" },
                    { key_: "Pension - Employee", value: "2000.00" },
                    { key_: "CPF - Employee", value: "200.00" },
                  ]}
                />
                <Row
                  list={[{ key_: "Net Pay", value: "$ 56,000.00", bold: true }]}
                />
                <div className="PayslipFooter">
                  <div>
                    <button>Finalise</button>
                    <Link to="/">Notes</Link>
                  </div>
                  <div>
                    <span>More</span>
                    <span>Preview</span>
                  </div>
                </div>
              </>
            ) : (
              <p>There are no payslip-specific inputs for this payslip.</p>
            )}
          </CardWithHeaders>
        </div>
        <div className="RecentActivity">
          <h2>Recent Activity</h2>
          {props.data.salary_detail ? (
            <>
              <p>
                <b>--</b>{" "}
                <span>Savings added (2 minutes ago by Leke Ariyo )</span>
              </p>
              <p>
                <b>--</b> <span>FWL added (2 minutes ago by Leke Ariyo )</span>
              </p>
              <p>
                <b>--</b>
                <span>
                  Monthly Commission added (3 minutes ago by Leke Ariyo )
                </span>
              </p>
            </>
          ) : null}
        </div>
        <div className="PayrollChart">
          {props.data.salary_detail ? (
            <EmployeeChart data={props.chartData} />
          ) : null}
        </div>
      </>
    );
  } else if (props.error) {
    content = <h3>Something went wrong...</h3>;
  }

  return <div className="Payroll">{content}</div>;
};
export default withRouter(Payroll);
