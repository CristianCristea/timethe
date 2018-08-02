import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import Project from '../Project';
import './projects.css';

function Projects({ projects }) {
  return (
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
}

const mapStateToProject = (state, ownProps) => ({
  // return archived projects based on the url
  projects: state.projects.filter(project =>
    ((RegExp('archive').test(ownProps.archive)) ? project.archived : !project.archived)),
});

export default connect(mapStateToProject)(Projects);

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};
