import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import Project from '../Project';
import './projects.css';

function Projects({ projects }) {
  return (
    <section>
      <ul className="projects__list p-0">
        <Container>
          <Row>
            <Col>
              <div className="projects">
                {projects.map(project => (
                  <Project project={project} key={project.id} />
                ))}
              </div>
            </Col>
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
