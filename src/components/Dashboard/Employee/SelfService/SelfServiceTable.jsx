import React from "react";
import CheckButton from "../../../ui/CheckButton";
import Input from "../../../ui/Input";

const SelfServiceTable = (props) => (
  <div className="SelfServiceTable">
    <div className="SelfServiceTableHeader">
      <div>Employee</div>
      <div>E-mail</div>
      <div>Enabled</div>
      <div>Last Activity</div>
    </div>
    <hr />
    {props.services.map((item, i) => (
      <div key={i} className="SelfServiceTableBody">
        <div>{item.firstname}, {item.lastname}</div>
        <Input
          noHeader
          placeHolder="Email address"
          onChange={(val) => props.onChange(val, i)}
          value={item.email}
          type="email"
        />
        <CheckButton
          checked={item.enabled}
          toggleCheck={() => props.toggleCheck(i)}
        />
        <div>Re-send activation</div>
      </div>
    ))}
  </div>
);

export default SelfServiceTable;
