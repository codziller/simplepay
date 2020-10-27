import React from "react";
import Backdrop from "./Backdrop";
import Card from "./Card";
import "./Modal.css";

const Modal = (props) => (
  <>
    {props.show ? <Backdrop close={props.close} /> : null}
    <div className="Modal" style={{ display: props.show ? "block" : "none" }}>
      <Card>{props.children}</Card>
    </div>
  </>
);

export default Modal;
