import React from "react";
import Button from "../../../ui/Button";
import CheckButton from "../../../ui/CheckButton";
import Input from "../../../ui/Input";
import Modal from "../../../ui/Modal";
import Select from "../../../ui/Select";
import "./EmployeeList.css";
import EmploymentTable from "./EmploymentTable";

const tableData = [
  {
    id: 1,
    lastname: "John",
    firstname: "Doe",
    number: "001",
  },
  {
    id: 2,
    lastname: "Jeff",
    firstname: "Bezos",
    number: "002",
  },
  {
    id: 3,
    lastname: "Krizhevsky",
    firstname: "Alex",
    number: "003",
  },
];

const EmployeeList = (props) => {
  let modalContent;
  switch (props.current) {
    case "point":
      modalContent = (
        <>
          <h1>Filter Pay Points</h1>
          <hr />
          <CheckButton
            title="Unassigned"
            checked={props.payPointChecked}
            toggleCheck={props.togglePayPointCheck}
          />
        </>
      );
      break;
    case "frequency":
      modalContent = (
        <>
          <h1>Filter Pay Frequency</h1>
          <hr />
          <CheckButton
            title="Monthly, ending on the 31st"
            checked={props.frequencyMonthly}
            toggleCheck={props.setFrequencyMonthly}
          />
          <CheckButton
            title="Weekly, ending on Wednesday"
            checked={props.frequencyWeekly}
            toggleCheck={props.setFrequencyWeekly}
          />
        </>
      );
      break;
    default:
      modalContent = (
        <>
          <h1>Filter By Status</h1>
          <hr />
          <Select
            data={["all", "active", "inactive"]}
            value={props.status}
            onChange={(val) => props.setStatus(val)}
          />
        </>
      );
  }
  return (
    <div className="EmployeeList">
      <h1>Filter</h1>
      <Modal show={props.showModal} close={() => props.setShowModal(false)}>
        {modalContent}
      </Modal>
      <div className="Filter">
        <Button
          title="Pay Point"
          onClick={() => props.setShowModal(true, "point")}
        />
        <Button
          title="Pay Frequency"
          onClick={() => props.setShowModal(true, "frequency")}
        />
        <Button
          title="Status"
          onClick={() => props.setShowModal(true, "status")}
        />
        <Input
          placeHolder="Search"
          noHeader
          onChange={(e) => props.searchChange(e.target.value)}
          value={props.searchValue}
          type="text"
        />
      </div>
      <br />
      <EmploymentTable
        type="weekly"
        title="Weekly, ending on Wednesday"
        quantity={props.weeklyQuantity}
        onChange={(val) => props.setWeeklyQuantity(val)}
        sort={props.weeklySort}
        toggleSort={props.toggleWeeklySort}
        data={tableData}
        page={1}
      />
      <br />
      <EmploymentTable
        type="monthly"
        title="Monthly, ending on the 31st"
        quantity={props.monthlyQuantity}
        onChange={(val) => props.setMonthlyQuantity(val)}
        sort={props.monthlySort}
        toggleSort={props.toggleMonthlySort}
        data={tableData}
        page={2}
      />
    </div>
  );
};

export default EmployeeList;
