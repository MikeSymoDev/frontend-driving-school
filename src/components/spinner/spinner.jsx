import React from "react";
import "./spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="dot-container">
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>
      </div>
    </div>
  );
};

export default Spinner;
