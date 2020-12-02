import React from "react";
import Pdf from "react-to-pdf";
import './TransactionHistoryPdf.css';

const Table = (props) => (
  <>
    <h3>{props.title}</h3>
    <table className="TransactionTable">
      <tr>
        <th>Date</th>
        <th>Annual Bonus</th>
        <th>Basic Salary</th>
        <th>Non-monthly Commission</th>
        <th>Leave Paid Out</th>
        <th>Income paid out after tax clearance</th>
        <th>CDAC</th>
        <th>CPF-Employee</th>
        <th>ECF</th>
        <th>MBMF</th>
        <th>Pension</th>
        <th>Savings Deduction</th>
        <th>Share - Employee</th>
        <th>SINDA</th>
        <th>Income Withheld Pending Tax Clearance</th>
        <th>CPF - Employee</th>
        <th>Fwl</th>
        <th>SDL</th>
        <th>Share - Employer</th>
        <th>Gross Remuneration</th>
        <th>Nett pay</th>
        <th>Normal Rate</th>
      </tr>
      <tr>
        <td>2021-02-01</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </>
);

const TransactionHistoryPdf = () => {
  const ref = React.createRef();
  return (
    <div className="PaymentRunsPdf">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pdf targetRef={ref} filename="code-example.pdf">
          {({ toPdf }) => (
            <button className="Button" onClick={toPdf}>
              Generate Pdf
            </button>
          )}
        </Pdf>
      </div>
      <div className="PdfBody" ref={ref}>
        <h2>ransaction History Report</h2>
        <p>Period: 2021-02-01 to 2021-02-28</p>
        <p>Numbber of Employees: 0</p>
        <div>
          <h4>Lee, Vanessa</h4>
          <Table title="John, Doe" />
          <Table title="John, Doe" />
          <Table title="John, Doe" />
          <Table title="John, Doe" />
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPdf;
