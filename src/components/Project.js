import React from "react";
import PropTypes from "prop-types";

const Project = props => (
  <li>
    {props.project}
    <button
      onClick={e => {
        props.handleDeleteProject(props.project);
      }}
    >
      Delete
    </button>
  </li>
);

export default Project;

Project.propTypes = {
  project: PropTypes.string
};
