import React from "react";
import PropTypes from "prop-types";
import Project from "./Project";
import { Container, Row, Col } from "reactstrap";

const Projects = ({ projects, handleOpenProject }) => (
  <section className="projects">
    <Container>
      <Row>
        <Col>
          <ul className="projects__list p-0">
            {projects.map(project => (
              <Project key={project.id} project={project} />
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
