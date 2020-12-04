import React from "react";
const slipDetails = [
  "Employee Name",
  "Period",
  "NRIC",
  "Job Title",
  "Employment Date",
];

const slipBody = ["Leave Type", "Balance", "Adjmt.", "Taken", "Sched."];

export default function Preview({
  name,
  period,
  nric,
  job,
  date,
  companyAddress,
  leaveType,
  balance,
  adjmt,
  taken,
  sched,
}) {
  return (
    <div className="payslip_preview_container">
      <div>
        <div className="payslip_preview_heading">
          <table>
            <tbody>
              {slipDetails.map((item, i) => {
                let text =
                  i === 0
                    ? name
                    : i === 1
                    ? period
                    : i === 2
                    ? nric
                    : i === 3
                    ? job
                    : i === 4
                    ? date
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

          <p>{companyAddress}</p>
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
                  ? leaveType
                  : i === 1
                  ? balance
                  : i === 2
                  ? adjmt
                  : i === 3
                  ? taken
                  : i === 4
                  ? sched
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

// <table>
// <tbody>
//   <tr>
//     <td>
//       <span>Employee Name</span>
//     </td>
//     <td>
//       <span>{name}</span>
//     </td>
//   </tr>
//   <tr>
//     <td>
//       <span>Period</span>
//     </td>
//     <td>
//       <span>{period}</span>
//     </td>
//   </tr>
//   <tr>
//     <td>
//       <span>NRIC</span>
//     </td>
//     <td>
//       <span>{nric}</span>
//     </td>
//   </tr>
//   <tr>
//     <td>
//       <span>Job Title</span>
//     </td>
//     <td>
//       <span>{job}</span>
//     </td>
//   </tr>
//   <tr>
//     <td>
//       <span>Employment Date</span>
//     </td>
//     <td>
//       <span>{date}</span>
//     </td>
//   </tr>
// </tbody>
// </table>
