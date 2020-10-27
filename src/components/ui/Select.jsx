import React from "react";
import "./Select.css";

const Select = (props) => (
  <select
    onChange={(e) => props.onChange(e.target.value)}
    value={props.value}
    className="Select" required={props.required}
  >
    {props.initValue ? <option value="">{props.initValue}</option> : null}
    {props.data.map((val) => (
      <option key={val}>{val}</option>
    ))}
  </select>
);

export default Select;
