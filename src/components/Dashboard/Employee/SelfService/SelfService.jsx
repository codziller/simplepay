import React, { useState } from "react";
import Button from "../../../ui/Button";
import "./SelfService.css";
import SelfServiceTable from "./SelfServiceTable";

const SelfService = () => {
  const [selfServices, setSelfServices] = useState([
    { firstname: "John", lastname: "Doe", email: "", enabled: false },
    { firstname: "Alex", lastname: "Krichezky", email: "", enabled: false },
    { firstname: "Adam", lastname: "Props", email: "", enabled: false },
    { firstname: "SQD", lastname: "Tensor", email: "", enabled: false },
  ]);
  const updateSelfService = (val, i) => {
    let newSelfService = [...selfServices];
    newSelfService[i].email = val;
    setSelfServices(newSelfService);
  };
  const toggleCheck = (i) => {
    let newSelfService = [...selfServices];
    newSelfService[i].enabled = !selfServices[i].enabled;
    setSelfServices(newSelfService);
  };
  return (
    <div className="SelfService">
      <h1>Self Service</h1>
      <SelfServiceTable
        services={selfServices}
        onChange={updateSelfService}
        toggleCheck={toggleCheck}
      />
      <Button title="Save" />
    </div>
  );
};

export default SelfService;
