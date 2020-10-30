import React, { useState } from "react";
import TabHeader from "../../../ui/TabHeader";
import "./EmployeeDetail.css";
import Payroll from "./Payroll/Payroll";

const EmployeeDetail = () => {
  const headerData = [
    { key_: "payroll", title: "Payroll" },
    {
      key_: "edit",
      title: (
        <>
          Edit Info <i className="fas fa-sort-up"></i>
        </>
      ),
    },
    {
      key_: "leave",
      title: (
        <>
          Leave <i className="fas fa-sort-up"></i>
        </>
      ),
    },
    { key_: "end", title: "End Service" },
    { key_: "notes", title: "Notes" },
    { key_: "delete", title: "Delete" },
  ];

  const [current, setCurrent] = useState("payroll");

  return (
    <div className="EmployeeDetail">
      <div className="EmployeeDetailHeader">
        <h1>John, Doe</h1>
        <TabHeader
          data={headerData}
          setCurrent={(current) => setCurrent(current)}
          current={current}
        />

        {current === "payroll" ? (
          <Payroll
            paymentMethod="Cash"
            payFrequency="Weekly, ending on Wednesday"
            number="0008"
          />
        ) : null}
      </div>
    </div>
  );
};
export default EmployeeDetail;
