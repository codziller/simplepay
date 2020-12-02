import React, { useState } from "react";
import "./Iras.css";
import KeyValue from "../../../ui/KeyValue";
import Select from "../../../ui/Select";
import { Link } from "react-router-dom";

const Iras = (props) => {
  const [filingSeason, setFilingSeason] = useState("");
  return (
    <div className="Iras">
      <h1>Tax Certificates - 2020-12-31</h1>
      <KeyValue key_="Filing season">
        <Select
          value={filingSeason}
          data={["2020-12-31"]}
          required
          onChange={(val) => setFilingSeason(val)}
        />
      </KeyValue>
      <div className="IrasTable">
        <div className="IrasHeader">
          <h4>Employee</h4>
          <h4>Number</h4>
          <h4>Date</h4>
          <h4>View</h4>
        </div>
        <hr />
        <div className="IrasBody">
          <div>Koh, Felix</div>
          <div>009</div>
          <div>2020-09-09</div>
          <div>
            <i className="far fa-file-pdf"></i>
            <Link to="/">Edit</Link>
          </div>
        </div>
        <div className="IrasBody">
          <div>Koh, Felix</div>
          <div>009</div>
          <div>2020-09-09</div>
          <div>
            <i className="far fa-file-pdf"></i>
            <Link to="/">Edit</Link>
          </div>
        </div>
      </div>
      <div className="TaxCertificates">
        <i className="far fa-file-pdf"></i>
        <Link to="/">All Tax Certificates</Link> (10)
      </div>
    </div>
  );
};

export default Iras;
