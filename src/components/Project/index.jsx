import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import './project.css';

export default function Project({ project }) {
  const {
    name,
    description,
    startDate,
    archived,
  } = project;
  const link = archived
    ? `${process.env.PUBLIC_URL}/archive/${name}`
    : `${process.env.PUBLIC_URL}/projects/${name}`;

  return (
    <li className="project">
      <Link to={link} className="project-link" >
        <Card className="project-card">
          <CardBody className="project__card-body">
            <div>
              <CardTitle tag="h4" className="project__card-title">{name}</CardTitle>
              <div className="project__date">{moment.unix(startDate).format('MMMM Do YYYY')}</div>
            </div>
            <CardText>{description}</CardText>
          </CardBody>
        </Card>
      </Link>
    </li>
  );
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
};

