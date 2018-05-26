import React from "react";
import PropTypes from "prop-types";
import Project from "./Project";
import { Button } from "reactstrap";

const Projects = props => (
  <section className="projects">
    <Button color="danger" onClick={props.handleDeleteProjects}>
      Delete all Projects
    </Button>
    <ul>
      {props.projects.map(project => (
        <Project
          key={project}
          project={project}
          handleDeleteProject={props.handleDeleteProject}
        />
      ))}
    </ul>
  </section>
);

export default Projects;

Projects.propTypes = {
  projects: PropTypes.array
};
