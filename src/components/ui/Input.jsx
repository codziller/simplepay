import React from "react";
import "./Input.css";

const Input = (props) => (
  <div className="Input">
    {props.noHeader?null:<p className="Placeholder">{props.placeHolder}</p>}
    {props.error ? <p className="InputError">{props.error}</p> : null}
    <input
      type={props.type}
      disabled={props.disabled}
      required={props.required}
      value={props.value}
      onChange={e => props.onChange(e.target.value)}
      placeholder={props.placeHolder}
    />
  </div>
);

export default Input;
