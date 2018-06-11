import React from "react";
import { Container, Row, Col } from "reactstrap";
import FormModal from "./FormModal";

const ProjectPage = ({ match, projects, filterProject, handleEditProject }) => {
  const project = filterProject("name", match.params.name, projects);
  if (project.name) {
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
            <FormModal edit={true} />
          </Col>
        </Row>
      </Container>
    );
  }
};

export default ProjectPage;
