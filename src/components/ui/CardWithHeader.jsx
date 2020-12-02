import React, { useState } from "react";
import "./CardWithHeader.css";

const CardWithHeaders = (props) => {
  const [show, setShow] = useState(false);
  let height = "fit-content";
  let padding = 20;
  if (props.colapsible) {
    if (show) {
      height = "fit-content";
      padding = 20;
    } else {
      height = 0;
      padding = '0 20px';
    }
  }
  return (
    <div className="CardWithHeader">
      <div
        className="CardHeader"
        style={{ cursor: props.colapsible ? "pointer" : "auto" }}
        onClick={() => setShow(!show)}
      >
        {props.header}
      </div>
      <div className="CardBody" style={{ height: height, padding: padding }}>
        {props.children}
      </div>
    </div>
  );
};

export default CardWithHeaders;
