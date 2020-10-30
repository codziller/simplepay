import React from "react";
import "./CardWithHeader.css";

const CardWithHeaders = (props) => (
  <div className="CardWithHeader">
    <div className="CardHeader">{props.header}</div>
    <div className="CardBody">{props.children}</div>
  </div>
);

export default CardWithHeaders;
