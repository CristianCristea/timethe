import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./project.css";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";

const Project = ({ match, project }) => (
  <li className="project">
    <Card>
      <CardBody>
        <Row>
          <Col>
            <Link to={`/projects/${project.name}`}>
              <CardTitle>{project.name}</CardTitle>
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
