import React from "react";
import Pdf from "react-to-pdf";

const LeaveReportPdf = () => {
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
        <h2>Leave Days Report</h2>
        <p>Period: 2021-02-01 to 2021-02-28</p>
        <p>Numbber of Employees: 0</p>
      </div>
    </div>
  );
};

export default LeaveReportPdf;
