import React from "react";
import PropTypes from "prop-types";
import Project from "./Project";
import { Container, Row, Col, Button } from "reactstrap";

const Projects = props => (
  <section className="projects">
    <Container>
      <Row>
        <Col>
          <Button
            color="danger"
            className="projects__action"
            onClick={props.handleDeleteProjects}
          >
            Delete all Projects
          </Button>
          <ul className="projects__list">
            {props.projects.map(project => (
              <Project
                key={project}
                project={project}
                handleDeleteProject={props.handleDeleteProject}
              />
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Projects;

Projects.propTypes = {
  projects: PropTypes.array
};
