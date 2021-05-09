import React from "react";
import { formatTitle } from "../helpers";

const LabeledComponent = ({ title, children }) => {
  return (
    <div className="labeled_component">
      <h3>{formatTitle(title)}</h3>
      {children}
    </div>
  );
};

export default LabeledComponent;
