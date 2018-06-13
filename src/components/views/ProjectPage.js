import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import ProjectForm from "../Project/Form";

const ProjectPage = ({ match, projects, filterProject, handleEditProject }) => {
  const project = filterProject("name", match.params.name, projects);
  return (
    <Container>
      <Row>
        <Col>
          <div className="project">
            <h3 className="display-4">{project.name}</h3>
            <p className="lead">{project.description}</p>
          </div>
        </Col>
        <Col className="d-flex align-items-center">
          <ProjectForm
            edit={true}
            existingProject={project}
            handleEditProject={handleEditProject}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectPage;

ProjectPage.propTypes = {
  match: PropTypes.object,
  projects: PropTypes.array,
  filterProject: PropTypes.func,
  handleEditProject: PropTypes.func
};
