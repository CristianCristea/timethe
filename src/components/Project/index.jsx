import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import './project.css';

const Project = ({ project }) => (
  <li className="project">
    <Link to={`/projects/${project.name}`} className="project-link">
      <Card style={{ height: 300 }}>
        <CardBody>
          <CardTitle tag="h4">{project.name}</CardTitle>
          <CardText>{project.description}</CardText>
        </CardBody>
      </Card>
    </Link>
  </li>
);

export default Project;

Project.propTypes = {
  project: PropTypes.object.isRequired,
};

