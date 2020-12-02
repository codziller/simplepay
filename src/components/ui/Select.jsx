import React from "react";
import "./Select.css";

const Select = (props) => {
  let content;
  if (props.data.length > 0) {
    if (props.data[0].id) {
      content = props.data.map((val) => (
        <option value={val.id + "-" + val.name} key={val.id}>
          {val.name}
        </option>
      ));
    } else {
      content = props.data.map((val) => (
        <option value={val} key={val}>
          {val}
        </option>
      ));
    }
  }
  return (
    <select
      onChange={(e) => props.onChange(e.target.value)}
      value={props.value}
      className="Select"
      required={props.required}
    >
      <option value="">Select</option>
      {content}
    </select>
  );
};

export default Select;
