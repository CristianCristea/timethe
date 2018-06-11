import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";

const Project = ({ match, project }) => (
  <li className="project">
    <Card>
      <CardBody>
        <Row>
          <Col xs="6">
            <CardTitle>{project.name}</CardTitle>
          </Col>
          <Col xs="6" className="text-right">
            <Link
              className="btn btn-primary btn-success"
              to={`/projects/${project.name}`}
            >
              Open
            </Link>
          </Col>
        </Row>
      </CardBody>
    </Card>
  </li>
);

export default Project;

Project.propTypes = {
  project: PropTypes.object,
  handleOpenProject: PropTypes.func
};

// TODO: implement settings - not delete
