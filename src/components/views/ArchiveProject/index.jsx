import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Badge, Button } from 'reactstrap';
import MainNav from '../../UI/MainNav';
import Sessions from '../../Sessions';
import './ArchiveProject.css';


export default function ArchiveProject({
  project,
  totalSessionsTime,
  formatTime,
  handlePrintProject,
  handleGeneratePDF,
}) {
  const {
    name,
    description,
    startDate,
    archiveDate,
    sessions,
  } = project;

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
              <Badge color="secondary" className="">{totalSessionsTime}</Badge>
            </h1>
            <div className="export-btns">
              <Button className="btn btn-success btn-large mb-3" onClick={handlePrintProject}>Print</Button>
              <Button className="btn btn-success btn-large" onClick={() => handleGeneratePDF(project)}>Export PDF</Button>
            </div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h5>{startDate} - {archiveDate}</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Sessions</h4>
            <Sessions sessions={sessions} formatTime={formatTime} />
          </Col>
        </Row>
      </Container >
    </div>
  );
}

ArchiveProject.propTypes = {
  project: PropTypes.object.isRequired,
  totalSessionsTime: PropTypes.string.isRequired,
  formatTime: PropTypes.func.isRequired,
  handlePrintProject: PropTypes.func.isRequired,
  handleGeneratePDF: PropTypes.func.isRequired,
};
