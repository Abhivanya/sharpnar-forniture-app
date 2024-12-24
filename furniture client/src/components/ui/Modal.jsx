import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
const Modal = (props) => {
  const location = document.querySelector("#modal");
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, location)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        location
      )}
    </>
  );
};

const Backdrop = (props) => {
  return <div className="backdrop"></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

export default Modal;
