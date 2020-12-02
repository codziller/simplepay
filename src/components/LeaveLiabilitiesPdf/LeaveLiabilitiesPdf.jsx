import React from "react";
import Pdf from "react-to-pdf";

const Table = (props) => (
  <>
    <h3>{props.title}</h3>
    <table>
      <tr>
        <th>Loans</th>
        <th>Savings</th>
      </tr>
      <tr>
        <td>$ 0.00</td>
        <td>$ 0.00</td>
      </tr>
    </table>
  </>
);

const LoanSavingsPdf = () => {
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
        <h2>Leave Liabilities Reports</h2>
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

export default LoanSavingsPdf;
