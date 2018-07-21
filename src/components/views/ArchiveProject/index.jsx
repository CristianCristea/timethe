import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Container, Row, Col, Badge, Button } from 'reactstrap';
import { handlePrintProject, handleGeneratePDF, formatTime, getTotalSessionsTime, selectProject } from '../../../selectors/projects';
import MainNav from '../../UI/MainNav';
import Sessions from '../../Sessions';
import './ArchiveProject.css';


const ArchiveProject = ({ project }) => {
  const {
    name,
    description,
    startDate,
    archived,
    sessions,
  } = project;
  const totalSessionsTime = getTotalSessionsTime(sessions);
  const startDateFormat = moment.unix(startDate).format('dddd, MMMM Do YYYY');

  return (
    <div className="ArchiveProject">
      <MainNav />
      <Container id="projectPDF">

        <Row className="archivedProject mb-5">
          <Col>
            <h3 className="display-3">{name}</h3>
            <p className="lead">{description}</p>
          </Col>
          <Col>
            <h1 className="mt-4">
              <Badge color="secondary" className="">{formatTime(totalSessionsTime)}</Badge>
            </h1>
            <div className="export-btns">
              <Button className="btn btn-success btn-large mb-3" onClick={handlePrintProject}>Print</Button>
              <Button
                className="btn btn-success btn-large"
                onClick={() => handleGeneratePDF(project, totalSessionsTime)}
              >
                Export PDF
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h5>{startDateFormat} - {archived}</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Sessions</h4>
            <Sessions projectName={name} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const projectName = ownProps.match.params.name;

  return {
    project: selectProject(state.projects, projectName),
  };
};

export default connect(mapStateToProps)(ArchiveProject);


ArchiveProject.propTypes = {
  project: PropTypes.object.isRequired,
};
