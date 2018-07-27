import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import './project.css';

export default function Project({ project }) {
  const link = project.archived
    ? `/archive/${project.name}`
    : `/projects/${project.name}`;

  return (
    <li className="project">
      <Link to={link} className="project-link" >
        <Card className="project-card">
          <CardBody className="project-card-body">
            <CardTitle tag="h4" className="project-card-title">{project.name}</CardTitle>
            <CardText>{project.description}</CardText>
          </CardBody>
        </Card>
      </Link>
    </li>
  );
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
};

