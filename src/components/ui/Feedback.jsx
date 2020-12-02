import React from "react";
import "./Feedback.css";

const Feedback = ({ show, error, message }) => (
  <div
    className="Feedback"
    style={{
      display: show ? "block" : "none",
      color: error ? "tomato" : "green",
    }}
  >
    {message}
  </div>
);

export default Feedback;
