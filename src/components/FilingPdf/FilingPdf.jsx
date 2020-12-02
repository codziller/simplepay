import React from "react";
import "./FilingPdf.css";
import Pdf from "react-to-pdf";

const FilingPdf = () => {
  const ref = React.createRef();
  return (
    <div className="FilingPdf">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pdf targetRef={ref} filename="code-example.pdf">
          {({ toPdf }) => (
            <button className="Button" onClick={toPdf}>
              Generate Pdf
            </button>
          )}
        </Pdf>
      </div>
      <div style={{width: '100%'}} ref={ref}>
        <h2>Demo Company</h2>
        <h4>CPF Report</h4>
        <h4>Period: 2020-11-01 to 2020-11-30</h4>
        <table className="FilingPdfTable" >
          <tr>
            <th>Name</th>
            <th>CPF</th>
            <th>Ref</th>
            <th>Join</th>
            <th>Date</th>
            <th>Resign</th>
            <th>Date</th>
            <th>OW</th>
            <th>AW</th>
            <th>TW</th>
            <th>CPF</th>
            <th>MBMF</th>
            <th>SINDA</th>
            <th>CDAC</th>
            <th>ECF</th>
          </tr>
          <tr>
            <td>Lee, Vanessa</td>
            <td>S8813925I</td>
            <td>1994-07-17</td>
            <td></td>
            <td>$ 23,000.00</td>
            <td></td>
            <td>$ 23,000.00</td>
            <td>$ 990.00</td>
            <td></td>
            <td>$ 9.00</td>
            <td>$ 3.00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Lee, Vanessa</td>
            <td>S8813925I</td>
            <td>1994-07-17</td>
            <td></td>
            <td>$ 23,000.00</td>
            <td></td>
            <td>$ 23,000.00</td>
            <td>$ 990.00</td>
            <td></td>
            <td>$ 9.00</td>
            <td>$ 3.00</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default FilingPdf;
