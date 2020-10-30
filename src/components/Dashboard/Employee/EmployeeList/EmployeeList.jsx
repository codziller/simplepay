import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../../helpers/API_CONFIG";
import Button from "../../../ui/Button";
import CheckButton from "../../../ui/CheckButton";
import Input from "../../../ui/Input";
import Modal from "../../../ui/Modal";
import Select from "../../../ui/Select";
import "./EmployeeList.css";
import EmploymentTable from "./EmploymentTable";
import axios from "axios";

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
  const [weeklyLoading, setWeeklyLoading] = useState(false);
  const [weeklyError, setWeeklyError] = useState(false);
  const [weeklyEmployees, setWeeklyEmployees] = useState(null);
  const [weeklyPage, setWeeklyPage] = useState(1);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [weeklyPrevious, setWeeklyPrevious] = useState(null);
  const [weeklyNext, setWeeklyNext] = useState(null);
  const [monthlyLoading, setMonthlyLoading] = useState(false);
  const [monthlyError, setMonthlyError] = useState(false);
  const [monthlyPage, setMonthlyPage] = useState(1);
  const [monthlyCount, setMonthlyCount] = useState(0);
  const [monthlyEmployees, setMonthlyEmployees] = useState(null);
  const [monthlyPrevious, setMonthlyPrevious] = useState(null);
  const [monthlyNext, setMonthlyNext] = useState(null);

  const fetchWeeklyEmployees = (aUrl = null) => {
    let isActive = "";
    if (props.status === "active") {
      isActive = "&is_active=True";
    } else if (props.status === "inactive") {
      isActive = "&is_active=False";
    }
    let sort = "";
    if (props.weeklySort === "dec") {
      sort = "&reverse=True";
    }
    let url =
      BASE_URL +
      `/api/employees/?pay_frequency=weekly&page=${weeklyPage}${isActive}${sort}`;
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    };
    if (aUrl) {
      url = aUrl;
    }
    setWeeklyLoading(true);
    setWeeklyError(false);
    axios
      .get(url, { headers: headers })
      .then((res) => {
        console.log(res.data);
        setWeeklyLoading(false);
        setWeeklyEmployees(res.data.results);
        setWeeklyPrevious(res.data.previous);
        setWeeklyNext(res.data.next);
        setWeeklyCount(res.data.count);
      })
      .catch(() => {
        setWeeklyLoading(false);
        setWeeklyError(true);
      });
  };

  const fetchMonthlyEmployees = (aUrl = null) => {
    let isActive = "";
    if (props.status === "active") {
      isActive = "&is_active=True";
    } else if (props.status === "inactive") {
      isActive = "&is_active=False";
    }
    let sort = "";
    if (props.monthlySort === "dec") {
      sort = "&reverse=True";
    } 
    const headers = {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    };
    let url =
      BASE_URL +
      `/api/employees/?pay_frequency=monthly&page=${monthlyPage}${isActive}${sort}`;
    if (aUrl) {
      url = aUrl;
    }
    setMonthlyLoading(true);
    setMonthlyError(false);
    axios
      .get(url, { headers: headers })
      .then((res) => {
        console.log(res);
        setMonthlyLoading(false);
        setMonthlyEmployees(res.data.results);
        setMonthlyPrevious(res.data.previous);
        setMonthlyNext(res.data.next);
        setMonthlyCount(res.data.count);
      })
      .catch(() => {
        setMonthlyLoading(false);
        setMonthlyError(true);
      });
  };

  useEffect(() => {
    fetchWeeklyEmployees();
  }, [props.weeklySort]);

  useEffect(() => {
    fetchMonthlyEmployees();
  }, [props.monthlySort]);

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
      {props.frequencyWeekly ? (
        <>
          <EmploymentTable
            type="weekly"
            title="Weekly, ending on Wednesday"
            quantity={props.weeklyQuantity}
            onChange={(val) => props.setWeeklyQuantity(val)}
            sort={props.weeklySort}
            toggleSort={() => {
              props.toggleWeeklySort();
              setWeeklyPage(1);
            }}
            data={weeklyEmployees}
            loading={weeklyLoading}
            error={weeklyError}
            page={weeklyPage}
            count={weeklyCount}
            setPage={(page) => setWeeklyPage(page)}
            previous={weeklyPrevious}
            next={weeklyNext}
            nextOrPreviousPage={(type) => {
              if (type === "previous") {
                fetchWeeklyEmployees(weeklyPrevious);
                setWeeklyPage(weeklyPage - 1);
              } else {
                fetchWeeklyEmployees(weeklyNext);
                setWeeklyPage(weeklyPage + 1);
              }
            }}
          />
          <br />
        </>
      ) : null}
      {props.frequencyMonthly ? (
        <EmploymentTable
          type="monthly"
          title="Monthly, ending on the 31st"
          quantity={props.monthlyQuantity}
          onChange={(val) => props.setMonthlyQuantity(val)}
          sort={props.monthlySort}
          toggleSort={() => {
            props.toggleMonthlySort();
            setMonthlyPage(1);
          }}
          data={monthlyEmployees}
          loading={monthlyLoading}
          error={monthlyError}
          page={monthlyPage}
          count={monthlyCount}
          setPage={(page) => setMonthlyPage(page)}
          previous={monthlyPrevious}
          next={monthlyNext}
          nextOrPreviousPage={(type) => {
            if (type === "previous") {
              fetchMonthlyEmployees(monthlyPrevious);
              setMonthlyPage(monthlyPage - 1);
            } else {
              fetchMonthlyEmployees(monthlyNext);
              setMonthlyPage(monthlyPage + 1);
            }
          }}
        />
      ) : null}
    </div>
  );
};

export default EmployeeList;
