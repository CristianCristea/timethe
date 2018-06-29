import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import Project from '../Project/index';
import './projects.css';

const Projects = ({ projects }) => (
  <section className="projects">
    <ul className="projects__list p-0">
      <Container>
        <Row>
          {projects.map(project => (
            <Col xs="12" sm="6" md="4" ls="3" key={project.id}>
              <Project project={project} />
            </Col>
          ))}
        </Row>
      </Container>
    </ul>
  </section>
);

export default Projects;

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};
