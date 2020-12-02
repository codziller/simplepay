import React from "react";
import Pdf from "react-to-pdf";

const Table = (props) => (
  <>
    <h3>{props.title}</h3>
    <table>
      <tr>
        <th>Date</th>
        <th>Accural</th>
        <th>Entitlement</th>
        <th>Taken</th>
        <th>Adjustment</th>
        <th>Available from Previous Cycle</th>
        <th>Balance</th>
      </tr>
      <tr>
        <td>2021-02-01</td>
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

const LeaveReportsPdf = () => {
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
        <h2>Leave Report</h2>
        <p>Period: 2021-02-01 to 2021-02-28</p>
        <p>Numbber of Employees: 0</p>
        <div>
          <h4>Lee, Vanessa</h4>
          <Table title="Unpaid" />
          <Table title="Unpaid" />
          <Table title="Unpaid" />
          <Table title="Unpaid" />
        </div>
      </div>
    </div>
  );
};

export default LeaveReportsPdf;
