import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'reactstrap';
import './timer.css';
import { toggleIsSessionActive } from '../../../actions/helpers';
import EndSessionModal from '../EndSessionModal';

class Timer extends React.Component {
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
    const {
      isSessionActive,
      toggleIsSessionActive,
      projectName,
    } = this.props;
    const { paused, seconds } = this.state;

    return (
      <Row>
        <Col>
          <Row className="Timer m-0">
            <Col sm="8">
              <div className="Time mb-5">{this.formatClock()}</div>
            </Col>
            <Col sm="4" className="ControlBtns">
              <div>
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
                  {paused ? 'Continue' : 'Pause'}
                </Button>
              </div>
              <Button
                color="danger"
                className="ControlBtn mb-3"
                onClick={() => {
                  toggleIsSessionActive(isSessionActive);
                }}
              >
                Cancel
              </Button>

              <EndSessionModal
                seconds={seconds}
                projectName={projectName}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  isSessionActive: state.helpers.isSessionActive,
});

const mapDispatchToProps = {
  toggleIsSessionActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  isSessionActive: PropTypes.bool.isRequired,
  toggleIsSessionActive: PropTypes.func.isRequired,
};