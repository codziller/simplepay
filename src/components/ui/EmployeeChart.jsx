import React from "react";
import "./EmployeeChart.css";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

const data = [
  {
    name: "2020-08-10",
    income: 20000,
    deduction: 2400,
  },
  {
    name: "2020-08-10",
    income: 20000,
    deduction: 2400,
  },
  {
    name: "2020-08-10",
    income: 20000,
    deduction: 2400,
  },
  {
    name: "2020-08-10",
    income: 20000,
    deduction: 2400,
  },
  {
    name: "2020-08-10",
    income: 20000,
    deduction: 2400,
  },
  {
    name: "2020-08-10",
    income: 32000,
    deduction: 5000,
  },
  {
    name: "2020-08-10",
    income: 32100,
    deduction: 5000,
  },
  {
    name: "2020-08-10",
    income: 32500,
    deduction: 5000,
  },
];

const EmployeeChart = (props) => {
  console.log(props);
  return (
    <>
      <h2>Payslip History</h2>
      <div className="EmployeeChart">
        <div>
          <LineChart
            width={730}
            height={250}
            data={props.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="pay_date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="linear" dataKey="total_income" stroke="#00e676" />
            <Line type="linear" dataKey="total_deductions" stroke="#ff1744" />
          </LineChart>
        </div>
      </div>
    </>
  );
};

export default EmployeeChart;
