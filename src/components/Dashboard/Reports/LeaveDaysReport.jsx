import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "../../ui/Button";
import CardWithHeaders from "../../ui/CardWithHeader";
import CheckButton from "../../ui/CheckButton";
import Input from "../../ui/Input";
import KeyValue from "../../ui/KeyValue";
import Modal from "../../ui/Modal";
import Select from "../../ui/Select";

const LeaveDaysReport = (props) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [payPointChecked, togglePayPointCheck] = useState(true);
  const [frequencyMonthly, setFrequencyMonthly] = useState(true);
  const [frequencyWeekly, setFrequencyWeekly] = useState(true);
  const [status, setStatus] = useState("all");
  const [showModal, changeShowModal] = useState(false);
  const [current, setCurrent] = useState("");
  const [searchValue, searchChange] = useState("");

  const [annual, setAnnual] = useState(false);
  const [hospital, setHospital] = useState(false);
  const [sick, setSick] = useState(false);
  const [maternity, setMaternity] = useState(false);
  const [childCare, setChildCare] = useState(false);
  const [paternity, setPaternity] = useState(false);
  const [adoption, setAdoption] = useState(false);
  const [infantCare, setInfantCare] = useState(false);
  const [unpaid, setUnpaid] = useState(false);

  const setShowModal = (val, current) => {
    changeShowModal(val);
    setCurrent(current);
  };

  const toggleChecks = (all) => {
    if (all) {
      setAnnual(true);
      setHospital(true);
      setSick(true);
      setMaternity(true);
      setChildCare(true);
      setPaternity(true);
      setAdoption(true);
      setInfantCare(true);
      setUnpaid(true);
    } else {
      setAnnual(false);
      setHospital(false);
      setSick(false);
      setMaternity(false);
      setChildCare(false);
      setPaternity(false);
      setAdoption(false);
      setInfantCare(false);
      setUnpaid(false);
    }
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
    <div className="LeaveDaysReport">
      <CardWithHeaders header="Leave Days Report">
        <h2>Date Range</h2>
        <div className="DateFilter">
          <div>
            <KeyValue key_="From:">
              <Input
                noHeader
                type="date"
                value={fromDate}
                onChange={(val) => setFromDate(val)}
              />
            </KeyValue>
          </div>
          <div>
            <KeyValue key_="To:">
              <Input
                noHeader
                type="date"
                value={toDate}
                onChange={(val) => setToDate(val)}
              />
            </KeyValue>
          </div>
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
        <h2>Employees</h2>
        <p>All (11) employees selected</p>
        <hr />
        <h2>Leave Types</h2>
        <div className="RLists">
          <div>
            <span onClick={() => toggleChecks(true)}>All</span>,{" "}
            <span onClick={() => toggleChecks(false)}>None</span>
          </div>
          <CheckButton
            checked={annual}
            toggleCheck={() => setAnnual(!annual)}
            title="Annual"
          />
          <CheckButton
            checked={hospital}
            toggleCheck={() => setHospital(!hospital)}
            title="Hospital"
          />
          <CheckButton
            checked={sick}
            toggleCheck={() => setSick(!sick)}
            title="Sick"
          />
          <CheckButton
            checked={maternity}
            toggleCheck={() => setMaternity(!maternity)}
            title="Maternity"
          />
          <CheckButton
            checked={childCare}
            toggleCheck={() => setChildCare(!childCare)}
            title="Childcare"
          />
          <CheckButton
            checked={paternity}
            toggleCheck={() => setPaternity(!paternity)}
            title="Paternity"
          />
          <CheckButton
            checked={adoption}
            toggleCheck={() => setAdoption(!adoption)}
            title="Adoption"
          />
          <CheckButton
            checked={infantCare}
            toggleCheck={() => setInfantCare(!infantCare)}
            title="Infant care"
          />
          <CheckButton
            checked={unpaid}
            toggleCheck={() => setUnpaid(!unpaid)}
            title="Unpaid"
          />
        </div>
        <hr />
        <div className="ReportBtns">
          <Button title="Show Excel" />
          <Button onClick={e => {
            e.preventDefault()
            props.history.push('/leave-report-pdf')
          }} title="Show PDFs" />
        </div>
      </CardWithHeaders>
    </div>
  );
};
export default withRouter(LeaveDaysReport);
