import React from 'react';
import moment from 'moment';
// import PropTypes from 'prop-types';

import './timer.css';

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
    this.setState({ seconds: (moment().unix() - Number(this.state.start)) + this.state.pauseTime });
  }

  startTimer = () => {
    this.setState({ start: moment().unix() });
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
    const m = Math.floor((seconds / 60));
    let h = Math.floor(m / 60);

    if (h >= 24) {
      h = 0;
    }

    return `${this.formatTime(h)} : ${this.formatTime(m)} : ${this.formatTime(s)}`;
  }

  render() {
    return (
      <div className="Timer">
        <div className="Time">{this.formatClock()}</div>
        <button onClick={() => {
          if (this.state.paused) {
            this.startTimer();
          } else {
            this.pauseTimer();
          }
          }
        }
        >
          {this.state.paused ? 'Start' : 'Pause'}
        </button>
        <button onClick={this.stopTimer}>Stop</button>
      </div>

    );
  }
}

Timer.propTypes = {};

