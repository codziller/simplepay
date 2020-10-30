import React, { useState } from "react";
import TabHeader from "../../ui/TabHeader";
import AddEmployee from "./AddEmployee/AddEmployee";
import "./Employee.css";
import EmployeeList from "./EmployeeList/EmployeeList";
import SelfService from "./SelfService/SelfService";

const headerData = [
  {key_: 'list', title: 'Employee List'},
  {key_: 'add', title: 'Add New Employee'},
  {key_: 'self', title: 'Self-Service'},
  {key_: 'leave', title: 'Leave Overview'},
  {key_: 'bulk', title: 'Bulk Actions'},
]

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
      <TabHeader
        current={current}
        setCurrent={(current) => setCurrent(current)}
        data={headerData}
      />
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
      {current === "self" ? <SelfService /> : null}
    </div>
  );
};

export default Employee;
