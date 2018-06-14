import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import './project.css';

const Project = ({ project }) => (
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
  project: PropTypes.object.isRequired,
};

// TODO: implement settings - not delete
