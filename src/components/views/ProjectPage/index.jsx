import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import Timer from '../../UI/Timer';
import MainNav from '../../UI/MainNav';
import AlertBox from '../../UI/AlertBox';
import AlertBar from '../../UI/AlertBar';
import Sessions from '../../Sessions';
import './ProjectPage.css';

export default function ProjectPage({
  currentProject,
  startSession,
  activeSession,
  endSession,
  cancelSession,
  formatTime,
  totalSessionsTime,
  handleDeleteProject,
  handleFinishProject,
  history,
}) {
  return (
    <div className="ProjectPage">
      <MainNav />
      <Container>
        <Row className="ProjectDetails">
          <Col md="10" className="mb-5">
            <Row className="project">
              <Col>
                <h3 className="display-4">{currentProject.name}</h3>
              </Col>
              <Col>
                <h5 className="pt-3"><Badge color="secondary">{totalSessionsTime}</Badge></h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="lead">{currentProject.description}</p>
              </Col>
            </Row>
          </Col>
          <Col className="ProjectControlBtns">
            <Link
              to={`/edit-project/${currentProject.name}`}
              className={`btn btn-warning ${activeSession ? 'isDisabled' : ''}`}
            >
              Edit
            </Link>
            <AlertBox
              disabled={activeSession}
              btnName="Finish"
              color="success"
              text="Are you sure you want to finish the project?"
              history={history}
              currentProject={currentProject}
              handleFinishProject={handleFinishProject}
            />
            <AlertBox
              disabled={activeSession}
              btnName="Delete"
              color="danger"
              text="Are you sure you want to delete the project?"
              currentProject={currentProject}
              handleDeleteProject={handleDeleteProject}
              history={history}
              deleteProject
            />
          </Col>
        </Row>
        <Row>
          <Col className="mt-4 mb-4 p-0">
            {!activeSession &&
              <Button
                className="mb-5 mt-5 btn-lg"
                color="primary"
                onClick={() => {
                  if (!activeSession) {
                    startSession();
                  }
                }}
              >
                Start Session
              </Button>
            }

            {
              // display AlertBar only if one session is active
              activeSession &&
              <AlertBar color="info" text="The session will be canceled if you navigate away from the page" />
            }

            {
              // display Timer only if one session is active
              activeSession && <Timer
                endSession={endSession}
                cancelSession={cancelSession}
                currentProject={currentProject}
              />
            }
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Sessions</h4>
            <Sessions sessions={currentProject.sessions} formatTime={formatTime} />
          </Col>
        </Row>
      </Container >
    </div>
  );
}

ProjectPage.propTypes = {
  currentProject: PropTypes.object.isRequired,
  startSession: PropTypes.func.isRequired,
  cancelSession: PropTypes.func.isRequired,
  activeSession: PropTypes.bool.isRequired,
  endSession: PropTypes.func.isRequired,
  formatTime: PropTypes.func.isRequired,
  totalSessionsTime: PropTypes.string.isRequired,
  handleDeleteProject: PropTypes.func.isRequired,
  handleFinishProject: PropTypes.func.isRequired,
  history: PropTypes.object,
};

ProjectPage.defaultProps = {
  history: {},
};
