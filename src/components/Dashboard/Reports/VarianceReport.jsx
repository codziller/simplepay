import React, { useState } from "react";
import Button from "../../ui/Button";
import CardWithHeaders from "../../ui/CardWithHeader";
import CheckButton from "../../ui/CheckButton";
import Input from "../../ui/Input";
import KeyValue from "../../ui/KeyValue";
import Modal from "../../ui/Modal";
import Select from "../../ui/Select";

const VarianceReport = (props) => {
  const [period, setPeriod] = useState("");
  const [time, seTime] = useState("");
  const [options, setOptions] = useState(false);
  const [payPointChecked, togglePayPointCheck] = useState(true);
  const [frequencyMonthly, setFrequencyMonthly] = useState(true);
  const [frequencyWeekly, setFrequencyWeekly] = useState(true);
  const [status, setStatus] = useState("all");
  const [showModal, changeShowModal] = useState(false);
  const [current, setCurrent] = useState("");
  const [searchValue, searchChange] = useState("");

  const setShowModal = (val, current) => {
    changeShowModal(true);
    setCurrent(current);
  };

  let modalContent;
  switch (current) {
    case "point":
      modalContent = (
        <>
          <h1>Filter Pay Points</h1>
          <hr />
          <CheckButton
            title="Unassigned"
            checked={payPointChecked}
            toggleCheck={() => togglePayPointCheck(!payPointChecked)}
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
            checked={frequencyMonthly}
            toggleCheck={() => setFrequencyMonthly(!frequencyMonthly)}
          />
          <CheckButton
            title="Weekly, ending on Wednesday"
            checked={frequencyWeekly}
            toggleCheck={() => setFrequencyWeekly(!frequencyWeekly)}
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
            value={status}
            onChange={(val) => setStatus(val)}
          />
        </>
      );
  }

  return (
    <div className="EmployeeInfo">
      <CardWithHeaders header="Variance Report">
        <h2>Date Range</h2>
        <div className="PeriodFilter">
          <span>Period: </span>
          <Select
            value={period}
            data={[
              "Weekly, ending on Wednesday",
              "Monthly, ending on the 31st",
            ]}
            onChange={(val) => setPeriod(val)}
          />
          <Select
            value={time}
            data={["Monthly - 2020-10-10"]}
            onChange={(val) => seTime(val)}
          />
          <div></div>
        </div>
        <hr />
        <h2>Filters</h2>
        <Modal show={showModal} close={() => changeShowModal(false)}>
          {modalContent}
        </Modal>
        <div className="Filter">
          <Button
            title="Pay Point"
            onClick={() => setShowModal(true, "point")}
          />
          <Button
            title="Pay Frequency"
            onClick={() => setShowModal(true, "frequency")}
          />
          <Button title="Status" onClick={() => setShowModal(true, "status")} />
          <Input
            placeHolder="Search"
            noHeader
            onChange={(val) => searchChange(val)}
            value={searchValue}
            type="text"
          />
        </div>
        <hr />
        <h2>Options</h2>
        <CheckButton
          checked={options}
          toggleCheck={() => setOptions(!options)}
          title="Include once-off payslips"
        />
        <hr />
        <h2>Employees</h2>
        <p>All (11) employees selected</p>
        <hr />
        <Button title="Show Excel" />
      </CardWithHeaders>
    </div>
  );
};
export default VarianceReport;
