import React from 'react';
import { Container, Row, Col, Badge, Button } from 'reactstrap';
import MainNav from '../../UI/MainNav';
import Sessions from '../../Sessions';
import './ArchiveProject.css';


export default function ArchiveProject({
  project,
  totalSessionsTime,
  formatTime,
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
      <Container>
        <Row >
          <Col className="mb-5">
            <Row className="archivedProject">
              <Col>
                <h3 className="display-3">{name}</h3>
              </Col>
              <Col>
                <h1 className="mt-4">
                  <Badge color="secondary" className="">{totalSessionsTime}</Badge>
                </h1>
                <Button className="btn btn-success btn-large">Export data</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="lead">{description}</p>
              </Col>
            </Row>
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

