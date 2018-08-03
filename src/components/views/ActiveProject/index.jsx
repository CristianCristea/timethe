import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Timer from '../../UI/Timer';
import MainNav from '../../UI/MainNav';
import AlertBox from '../../UI/AlertBox';
import AlertBar from '../../UI/AlertBar';
import Sessions from '../../Sessions';

import { toggleIsSessionActive } from '../../../actions/helpers';
import { selectProject, getTotalSessionsTime, formatTime } from '../../../selectors/projects';
import './ActiveProject.css';

function ActiveProject({
  project,
  history,
  isSessionActive,
  toggleIsSessionActive,
  match,
}) {
  const {
    name,
    description,
    id,
  } = project;
  const totalSessionsTime = getTotalSessionsTime(project.sessions);

  return (
    <div className="ActiveProject">
      <MainNav />
      <Container>
        <Row className="ProjectDetails">
          <Col md="10" className="mb-5">
            <Row className="project">
              <Col>
                <h3 className="display-4 project-name">{name}</h3>
              </Col>
              <Col>
                <h5 className="pt-3">
                  <Badge
                    color="secondary"
                    style={{
                      fontSize: '1.2rem',
                      padding: '.7rem',
                    }}
                  >
                    {formatTime(totalSessionsTime)}
                  </Badge>
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="lead">{description}</p>
              </Col>
            </Row>
          </Col>
          <Col className="ProjectControlBtns mt-3">
            <Link
              to={`${process.env.PUBLIC_URL}/edit-project/${id}`}
              className={`btn btn-warning ${isSessionActive ? 'isDisabled' : ''}`}
            >
              Edit
            </Link>
            <AlertBox
              disabled={isSessionActive}
              btnName="Finish"
              color="success"
              text="Are you sure you want to finish the project?"
              projectId={project.id}
              history={history}
            />
            <AlertBox
              disabled={isSessionActive}
              btnName="Delete"
              color="danger"
              text="Are you sure you want to delete the project?"
              projectId={project.id}
              history={history}
              deleteP
            />
          </Col>
        </Row>

        <Row>
          <Col className="mt-4 mb-4 p-0">
            {!isSessionActive &&
              <Button
                className="mb-5 mt-5 btn-lg"
                color="primary"
                onClick={() => {
                  if (!isSessionActive) {
                    toggleIsSessionActive(isSessionActive);
                  }
                }}
              >
                Start Session
              </Button>
            }

            {
              // display AlertBar only if one session is active
              isSessionActive &&
              <AlertBar color="info" text="The session will be canceled if you navigate away from the page" />
            }

            {
              // display Timer only if one session is active
              // start timer on component mount
              isSessionActive && <Timer projectName={name} />
            }
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Sessions</h4>
            <Sessions projectName={match.params.name} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { projects } = state;
  const projectName = ownProps.match.params.name;

  return {
    project: selectProject(projects, projectName),
    isSessionActive: state.helpers.isSessionActive,
  };
};

const mapDispatchToProps = {
  toggleIsSessionActive,
};


export default connect(mapStateToProps, mapDispatchToProps)(ActiveProject);

ActiveProject.propTypes = {
  project: PropTypes.object.isRequired,
  history: PropTypes.object,
  isSessionActive: PropTypes.bool,
  toggleIsSessionActive: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

ActiveProject.defaultProps = {
  history: {},
  isSessionActive: false,
};
