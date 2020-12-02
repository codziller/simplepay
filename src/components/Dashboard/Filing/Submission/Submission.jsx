import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../ui/Button";
import CardWithHeaders from "../../../ui/CardWithHeader";
import "./Submission.css";

const parseDate = (date) => {
  let date_ = date.split("T")[0];
  let time = date.split("T")[1].slice(0, 5);
  return date_ + " " + time;
};

const Submission = (props) => (
  <div className="Submission">
    <CardWithHeaders colapsible header={<div>{props.dateTitle}</div>}>
      <div className="SubmissionTable">
        <div>
          <div className="CPFReturnHeader">
            <div>CPF Return </div>
            <Link to="/">Inputs</Link>
          </div>
          <div className="FilingHeader">
            <h4 className="First">Status</h4>
            <h4 className="Second">Date Finalised</h4>
            <h4 className="Third"></h4>
            <h4 className="Fourth">Account Iinfo</h4>
          </div>
          <hr />
          <div className="FilingBody">
            <div className="First">{props.status}</div>
            <div className="Second">
              {props.date_finalised ? parseDate(props.date_finalised) : " "}
            </div>
            <div className="FilingFiles Third">
              <Link to="/filing-pdf">PDF</Link>
              <Link to="/">FTP File</Link>
              {!props.date_finalised ? (
                <div className="FinalizeBtn" onClick={props.finalise}>
                  Finalize
                </div>
              ) : null}
            </div>
            <div className="Fourth">
              {props.status === "finalised" ? (
                <Link to="/filing">Send SDL Rounding to Xero</Link>
              ) : (
                "Please finalise your CPF Return"
              )}
            </div>
          </div>
        </div>
      </div>
    </CardWithHeaders>
  </div>
);

export default Submission;
