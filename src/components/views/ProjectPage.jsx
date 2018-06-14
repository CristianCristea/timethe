import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const ProjectPage = ({
  match,
  projects,
  filterProject,
}) => {
  const project = filterProject('name', match.params.name, projects);
  return (
    <Container>
      <Row>
        <Col>
          <div className="project">
            <h3 className="display-4">{project.name}</h3>
            <p className="lead">{project.description}</p>
          </div>
        </Col>
        <Link to={`/edit-project/${project.name}`}>Settings</Link>
      </Row>
    </Container>
  );
};

export default ProjectPage;

ProjectPage.propTypes = {
  match: PropTypes.object.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterProject: PropTypes.func.isRequired,
};
