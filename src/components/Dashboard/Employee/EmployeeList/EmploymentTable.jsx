import React from "react";
import { Link } from "react-router-dom";
import Select from "../../../ui/Select";

const EmploymentTable = (props) => {
  let tableContent;
  if (props.loading) {
    tableContent = (
      <div className="TableLoading">
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
        </div>
      </div>
    );
  } else if (props.data) {
    tableContent = props.data.map((employee) => (
      <div key={employee.id} className="EmploymentTableBody">
        <div>
          <Link to={"/employee/" + employee.id}>{employee.user.last_name}</Link>
        </div>
        <div>
          <Link to={"/employee/" + employee.id}>
            {employee.user.first_name}
          </Link>
        </div>
        <div>
          <Link to={"/employee/" + employee.id}>{employee.id}</Link>
        </div>
      </div>
    ));
  }
  return (
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
      {tableContent}
      <div className="PrevNext">
        <button
          disabled={!props.previous ? true : false}
          className="PrevBtn Button"
          onClick={() => props.nextOrPreviousPage("previous")}
        >
          Previous
        </button>
        <span>Page {props.page}</span>
        <button
          disabled={!props.next ? true : false}
          className="NextBtn Button"
          onClick={() => props.nextOrPreviousPage("next")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmploymentTable;
