import React from "react";
import PropTypes from "prop-types";
import { formatTitle } from "../helpers";

const LabeledComponent = ({ title, children }) => {
  return (
    <div className="labeled_component">
      <h3>{formatTitle(title)}</h3>
      {children}
    </div>
  );
};

LabeledComponent.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default LabeledComponent;
