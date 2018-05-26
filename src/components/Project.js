import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Card, CardBody, CardTitle } from "reactstrap";

const Project = ({ project, handleDeleteProject }) => (
  <li className="project">
    <Card>
      <CardBody>
        <Row>
          <Col xs="6">
            <CardTitle>{project}</CardTitle>
          </Col>
          <Col xs="6" className="text-right">
            <Button
              color="danger"
              onClick={e => {
                handleDeleteProject(project);
              }}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  </li>
);

export default Project;

Project.propTypes = {
  project: PropTypes.string
};

// TODO: implement settings - not delete
