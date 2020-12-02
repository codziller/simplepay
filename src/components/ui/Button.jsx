import React from "react";
import "./Button.css";

const Button = (props) => (
  <button
    disabled={props.disabled}
    type={props.type}
    onClick={props.onClick}
    className="Button"
  >
    {props.title}
  </button>
);

export default Button;
