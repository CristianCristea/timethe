import React from "react";
import { Route } from "react-router-dom";
import Header from "./Header";

const ProjectPage = ({ match, projects, selectProject }) => {
  const project = selectProject(match.params.name, projects);
  if (project.name) {
    return (
      <div className="project">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
    );
  }
};

export default ProjectPage;
