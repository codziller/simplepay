import React from "react";
const slipDetails = [
  "Period ending",
  "Pay Frequency",
  "Payment Method",
  "Pay Point",
];

const slipBody = [
  "Name",
  "Number",
  "Net Pay.",
  "Bank",
  "Account Type",
  "Account Number",
  "Branch Code",
];

export default function Preview({
  companyName,
  periodEnding,
  payFreq,
  payMethod,
  payPoint,
  name,
  number,
  netPay,
  bank,
  acctType,
  acctNumber,
  branchCode,
}) {
  return (
    <div className="payslip_preview_container payrun_preview_container">
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
        {companyName}
      </h1>
      <div>
        <div className="payslip_preview_heading">
          <table>
            <tbody>
              {slipDetails.map((item, i) => {
                let text =
                  i === 0
                    ? periodEnding
                    : i === 1
                    ? payFreq
                    : i === 2
                    ? payMethod
                    : i === 3
                    ? payPoint
                    : "";
                return (
                  <tr key={"item" + i}>
                    <td>
                      <span style={{ fontWeight: "bold", marginRight: "10px" }}>
                        {item}
                      </span>
                    </td>

                    <td>
                      <span>{text}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <table className="payslip_preview_body">
        <thead>
          <tr>
            {slipBody.map((item, i) => {
              return <th key={item + i}>{item}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          <tr>
            {slipBody.map((item, i) => {
              let text =
                i === 0
                  ? name
                  : i === 1
                  ? number
                  : i === 2
                  ? netPay
                  : i === 3
                  ? bank
                  : i === 4
                  ? acctType
                  : i === 5
                  ? acctNumber
                  : i === 6
                  ? branchCode
                  : "";
              return (
                <td key={item + i}>
                  <span>{text}</span>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
