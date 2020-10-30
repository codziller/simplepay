import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import CardWithHeaders from "../../../../ui/CardWithHeader";
import EmployeeChart from "../../../../ui/EmployeeChart";
import Loading from "../../../../ui/Loading";
import "./Payroll.css";
import { BASE_URL } from "../../../../../helpers/API_CONFIG";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const fetchEmployee = () => {
    const id = props.match.params.id;
    console.log(id)
    setLoading(true);
    setError(false);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    const url = BASE_URL + `/api/employees/${id}/`;
    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch(() => {
        console.log("error...");
      });
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  let content;
  if (loading) {
    content = <Loading />;
  } else if (data) {
    content = (
      <>
        <p>
          <b>Pay Frequency:</b>{" "}
          {data.pay_frequency === "weekly"
            ? "Weekly, ending on Wednesday"
            : "Monthly, ending on the 31st"}
          , <b>Payment method:</b>
          {data.payment_method}, <b>Number:</b> {props.id}
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
            <Row
              link="/calculations/edit/id"
              title="Basic Salary"
              list={[{ key_: "Fixed Amount", value: data.basic_salary }]}
            />
            <Row
              link="/"
              title="Employer Loan"
              list={[
                {
                  key_: "Interest Rate",
                  value: data.salary_detail.interest_rate + "%",
                },
                {
                  key_: "Regular Payment",
                  value: data.salary_detail.regular_repayment,
                },
              ]}
            />
            <Row
              link="/"
              title="Savings"
              list={[
                {
                  key_: "Regular deduction",
                  value: data.salary_detail.regular_deduction,
                },
              ]}
            />
            <Row
              link="/"
              title="FWL"
              list={[{ key_: "Amount", value: data.salary_detail.flw_amount }]}
            />
            <Row link="/" title="Monthly Commission" />
            <Row
              link="/"
              title="Pension"
              list={[
                { key_: "Calculations", value: "Fixed amount per period" },
                { key_: "Fixed Contribution by Employee", value: "$1,000.00" },
                { key_: "Fixed Contribution by Employer", value: "$1,000.00" },
              ]}
            />
            <Row
              title="CPF at Higher Rates"
              link="/"
              list={[
                {
                  key_: "Contribution",
                  value: data.salary_detail.contribution,
                },
                {
                  key_: "Date effective",
                  value: data.salary_detail.date_effective,
                },
              ]}
            />
            <Row
              title="SHARE"
              link="/"
              list={[
                {
                  key_: "Employee Amount",
                  value: data.salary_detail.employee_amount,
                },
                {
                  key_: "Employer Amount",
                  value: data.salary_detail.employer_amount,
                },
              ]}
            />
            <Link to="/">Self-Help Group Funds</Link>
          </CardWithHeaders>
          <CardWithHeaders
            header={
              <div className="RegularInputsHeader">
                <p>
                  Payslip Inputs:
                  {data.salary_detail.current_pay_slip
                    ? data.salary_detail.current_pay_slip.pay_date
                    : null}
                </p>
                <div>Add</div>
              </div>
            }
          >
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
                  value: data.salary_detail.current_pay_slip
                    ? "$" + data.salary_detail.current_pay_slip.gratuity_input
                    : null,
                },
                {
                  key_: "Notice pay input",
                  value: data.salary_detail.current_pay_slip
                    ? "$" + data.salary_detail.current_pay_slip.notice_pay_input
                    : null,
                },
                {
                  key_: "Ex gratia input",
                  value: data.salary_detail.current_pay_slip
                    ? "$" + data.salary_detail.current_pay_slip.ex_gratia_input
                    : null,
                },
                {
                  key_: "Termination others input",
                  value: data.salary_detail.current_pay_slip
                    ? "$" +
                      data.salary_detail.current_pay_slip
                        .termination_others_input
                    : null,
                },
                { key_: "Compensation for Loss of Office", value: "" },
                {
                  key_: "Amount",
                  value: data.salary_detail.current_pay_slip
                    ? "$" +
                      data.salary_detail.current_pay_slip
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
                  value: data.salary_detail.current_pay_slip
                    ? "$" +
                      data.salary_detail.current_pay_slip.non_monthly_commission
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
                  value: data.salary_detail.current_pay_slip
                    ? "$" +
                      data.salary_detail.current_pay_slip
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
                  value: data.salary_detail.current_pay_slip
                    ? "$" + data.salary_detail.current_pay_slip.employee_amount
                    : null,
                },
                {
                  key_: "Employer Amount",
                  value: data.salary_detail.current_pay_slip
                    ? "$" + data.salary_detail.current_pay_slip.employer_amount
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
                  value: data.salary_detail.current_pay_slip
                    ? "$" + data.salary_detail.current_pay_slip.income_withheld
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
                  value: data.salary_detail.current_pay_slip
                    ? "$" + data.salary_detail.current_pay_slip.annual_bonus
                    : null,
                },
              ]}
            />
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
            <Row
              list={[
                { key_: "Income", value: "70,800.00", bold: true },
                { key_: "Basic Salary", value: "18,000.00" },
                { key_: "Annual Bonus", value: "2,000.00" },
                { key_: "Leave Paid Out", value: "54,000.00" },
                {
                  key_: "Income Paid Out After Tax Clearance",
                  value: "200.00",
                },
                {
                  key_: "Non-Monthly Commission",
                  value: data.salary_detail.current_pay_slip
                    ? "$" + data.salary_detail.current_pay_slip.income_after_tax
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
          </CardWithHeaders>
        </div>
        <div className="RecentActivity">
          <h2>Recent Activity</h2>
          <p>
            <b>--</b> <span>Savings added (2 minutes ago by Leke Ariyo )</span>
          </p>
          <p>
            <b>--</b> <span>FWL added (2 minutes ago by Leke Ariyo )</span>
          </p>
          <p>
            <b>--</b>
            <span>Monthly Commission added (3 minutes ago by Leke Ariyo )</span>
          </p>
        </div>
        <div className="PayrollChart">
          <EmployeeChart />
        </div>
      </>
    );
  } else if (error) {
    content = <h3>Something went wrong...</h3>;
  }

  return <div className="Payroll">{content}</div>;
};
export default withRouter(Payroll);
