import React from "react";
import "./KeyValue.css";

const KeyValue = (props) => (
  <div className="KeyValue">
    <div className="Key">{props.key_}</div>
    <div className="Value">{props.children}</div>
  </div>
);

export default KeyValue;
