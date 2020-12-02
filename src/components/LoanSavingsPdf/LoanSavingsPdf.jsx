import React from "react";
import Pdf from "react-to-pdf";

const Table = (props) => (
  <>
    <h3>{props.title}</h3>
    <table>
      <tr>
        <th>Days</th>
        <th>Daily Rate</th>
        <th>Liability</th>
      </tr>
      <tr>
        <td>28.00</td>
        <td>$ 0.00</td>
        <td>$ 0.00</td>
      </tr>
    </table>
  </>
);

const LeaveLiabilitiesPdf = () => {
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
        <h2>Loan Savings Report</h2>
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

export default LeaveLiabilitiesPdf;
