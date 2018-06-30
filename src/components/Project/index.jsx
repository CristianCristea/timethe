import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import './project.css';

const Project = ({ project }) => {
  const link = project.archiveDate
    ? `/archive/${project.name.toLowerCase()}`
    : `/projects/${project.name.toLowerCase()}`;

  return (<li className="project">
    <Link to={link} className="project-link">
      <Card style={{ height: 300 }}>
        <CardBody>
          <CardTitle tag="h4">{project.name}</CardTitle>
          <CardText>{project.description}</CardText>
        </CardBody>
      </Card>
    </Link>
  </li>
  );
}

export default Project;

Project.propTypes = {
  project: PropTypes.object.isRequired,
};

