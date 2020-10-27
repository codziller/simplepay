import React from "react";
import { Link } from "react-router-dom";
import Select from "../../../ui/Select";

const EmploymentTable = (props) => (
  <div className="EmploymentTable">
    <h1>{props.title}</h1>
    <div className="TableQuantity">
      <p>Show</p>
      <Select
        value={props.quantity}
        data={[10, 25, 50, 100]}
        onChange={(val) => props.onChange(val)}
      />
    </div>
    <br />
    <br />
    <div className="EmploymentTableHeader">
      <div className="Sort">
        <span>Last Name</span>
        <span className="SortIcon" onClick={props.toggleSort}>
          {props.sort === "acc" ? (
            <i className="fas fa-sort-up"></i>
          ) : (
            <i className="fas fa-sort-down"></i>
          )}
        </span>
      </div>
      <div>First Name</div>
      <div>Number</div>
    </div>
    <hr />
    {props.data.map((employee) => (
      <div key={employee.id} className="EmploymentTableBody">
        <div>
          <Link to="/employee/id">{employee.lastname}</Link>
        </div>
        <div>
          <Link to="/employee/id">{employee.firstname}</Link>
        </div>
        <div>
          <Link to="/employee/id">{employee.number}</Link>
        </div>
      </div>
    ))}
    <div className="PrevNext">
      <button className="PrevBtn Button">Previous</button>
      <span>Page {props.page}</span>
      <button className="NextBtn Button">Next</button>
    </div>
  </div>
);

export default EmploymentTable;
