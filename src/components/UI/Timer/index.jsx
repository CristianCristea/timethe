import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button, Row, Col } from 'reactstrap';
import './timer.css';
import EndSessionModal from '../EndSessionModal';

export default class Timer extends React.Component {
  state = {
    start: moment().unix(),
    seconds: 0,
    paused: false,
    pauseTime: 0,
  };

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  tick = () => {
    const { start, pauseTime } = this.state;
    this.setState({ seconds: (moment().unix() - Number(start)) + pauseTime });
  }

  startTimer = () => {
    this.setState({
      start: moment().unix(),
      paused: false,
    });
    this.timer = setInterval(this.tick, 300);
  }

  togglePause = () => {
    this.setState({ paused: !this.state.paused });
  }

  pauseTimer = () => {
    this.togglePause();
    this.stopTimer();
    this.setState({ pauseTime: this.state.seconds });
  }

  stopTimer = () => {
    this.setState({ pauseTime: 0 });
    clearInterval(this.timer);
  }

  formatTime = (time) => {
    if (typeof time !== 'number') return false;
    let t = time;

    if (t < 10) {
      return `0${t}`;
    } else if (t > 60) {
      t = 0;
    }

    return t;
  }

  formatClock = ({ seconds } = this.state) => {
    const s = seconds % 60;
    const m = Math.floor((seconds / 60) % 60);
    let h = Math.floor(m / 60);

    if (h >= 24) {
      h = 0;
    }

    return `${this.formatTime(h)}:${this.formatTime(m)}:${this.formatTime(s)}`;
  }

  render() {
    const { endSession, currentProject } = this.props;
    const { paused, seconds } = this.state;

    return (
      <Row>
        <Col>
          <Row className="Timer m-0">
            <Col>
              <div className="Time">{this.formatClock()}</div>
            </Col>
            <Col className="text-right">
              <Button
                className="mb-3 ControlBtn"
                color="success"
                onClick={() => {
                  if (paused) {
                    this.startTimer();
                  } else {
                    this.pauseTimer();
                  }
                }
                }
              >
                {paused ? 'Start' : 'Pause'}
              </Button>
              <EndSessionModal
                endSession={endSession}
                stopTimer={this.stopTimer}
                seconds={seconds}
                currentProject={currentProject}
              />

            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

Timer.propTypes = {
  endSession: PropTypes.func.isRequired,
  currentProject: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string,
      note: PropTypes.string,
      seconds: PropTypes.number,
    })),
    startDate: PropTypes.string.isRequired,
  }).isRequired,
};

