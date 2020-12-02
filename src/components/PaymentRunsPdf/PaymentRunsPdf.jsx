import React from "react";
import "./PaymentRunsPdf.css";
import Pdf from "react-to-pdf";

const PaymentRunsPdf = () => {
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
        <h2>Demo Company</h2>
        <p>Payment Information</p>
        <p>Period ending: 2020-10-14</p>
        <p>Pay frequency: Weekly, ending on Wednesday</p>
        <p>Payment Method: GIRO</p>
        <p>Pay Point: Unassigned</p>
        <table>
          <tr>
            <td>Name</td>
            <td>Number</td>
            <td>Net Pay</td>
            <td>Bank</td>
            <td>Account Type</td>
            <td>Account Number</td>
            <td>Branch code</td>
          </tr>
          <tr>
            <td>Koh, Felix</td>
            <td>0009</td>
            <td>$ 23,000.00</td>
            <td>HSBC (Coporate)</td>
            <td>Bond</td>
            <td>951232423</td>
            <td>908</td>
          </tr>
          <tr>
            <td>Koh, Felix</td>
            <td>0009</td>
            <td>$ 23,000.00</td>
            <td>HSBC (Coporate)</td>
            <td>Bond</td>
            <td>951232423</td>
            <td>908</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default PaymentRunsPdf;
