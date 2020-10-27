import React, { useState } from "react";
import AddEmployee from "./AddEmployee/AddEmployee";
import "./Employee.css";
import EmployeeList from "./EmployeeList/EmployeeList";

const Employee = () => {
  const [current, setCurrent] = useState("list");
  const [showModal, setShowModal] = useState(false);
  const [search, setSearchChange] = useState("");
  const [payPointChecked, togglePayPointCheck] = useState(false);
  const [currentModal, setCurrentModal] = useState("");
  const [frequencyMonthly, setFrequencyMonthly] = useState(true);
  const [frequencyWeekly, setFrequencyWeekly] = useState(true);
  const [status, setStatus] = useState("all");
  const [weeklyQuantity, setWeeklyQuantity] = useState(10);
  const [monthlyQuantity, setMonthlyQuantity] = useState(10);
  const [weeklySort, toggleWeeklySort] = useState("acc");
  const [monthlySort, toggleMonthlySort] = useState("acc");

  const performSearch = (val) => {
    setSearchChange(val);
  };

  return (
    <div className="Employee">
      <h1>Employees</h1>
      <div className="TabHeader">
        <div
          onClick={() => setCurrent("list")}
          className={
            current === "list"
              ? "TabHeaderItem  TabHeaderItemActive"
              : "TabHeaderItem"
          }
        >
          <div>Employee List</div>
        </div>
        <div
          onClick={() => setCurrent("add")}
          className={
            current === "add"
              ? "TabHeaderItem  TabHeaderItemActive"
              : "TabHeaderItem"
          }
        >
          <div>Add New Employee</div>
        </div>
        <div
          onClick={() => setCurrent("self")}
          className={
            current === "self"
              ? "TabHeaderItem  TabHeaderItemActive"
              : "TabHeaderItem"
          }
        >
          <div>Self-Service</div>
        </div>
        <div
          onClick={() => setCurrent("leave")}
          className={
            current === "leave"
              ? "TabHeaderItem  TabHeaderItemActive"
              : "TabHeaderItem"
          }
        >
          <div>Leave Overview</div>
        </div>
        <div
          onClick={() => setCurrent("bulk")}
          className={
            current === "bulk"
              ? "TabHeaderItem  TabHeaderItemActive"
              : "TabHeaderItem"
          }
        >
          <div>Bulk Actions</div>
        </div>
      </div>
      <hr />
      {current === "list" ? (
        <EmployeeList
          showModal={showModal}
          setShowModal={(val, type = "") => {
            setCurrentModal(type);
            setShowModal(val);
          }}
          searchChange={(val) => performSearch(val)}
          searchValue={search}
          payPointChecked={payPointChecked}
          togglePayPointCheck={() => togglePayPointCheck(!payPointChecked)}
          current={currentModal}
          frequencyMonthly={frequencyMonthly}
          frequencyWeekly={frequencyWeekly}
          setFrequencyMonthly={() => setFrequencyMonthly(!frequencyMonthly)}
          setFrequencyWeekly={() => setFrequencyWeekly(!frequencyWeekly)}
          status={status}
          setStatus={(val) => setStatus(val)}
          weeklyQuantity={weeklyQuantity}
          setWeeklyQuantity={(val) => setWeeklyQuantity(val)}
          monthlyQuantity={monthlyQuantity}
          setMonthlyQuantity={(val) => setMonthlyQuantity(val)}
          weeklySort={weeklySort}
          monthlySort={monthlySort}
          toggleWeeklySort={() =>
            toggleWeeklySort(weeklySort === "acc" ? "dec" : "acc")
          }
          toggleMonthlySort={() =>
            toggleMonthlySort(monthlySort === "acc" ? "dec" : "acc")
          }
        />
      ) : null}
      {current === "add" ? <AddEmployee /> : null}
    </div>
  );
};

export default Employee;
