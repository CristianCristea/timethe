import React from 'react';
import PropTypes from 'prop-types';
import './session.css';

export default function Session({ session, formatTime, index }) {
  const { date, note, seconds } = session;

  return (
    <tr className="Session">
      <th scope="row">{index}</th>
      <td className="session-date">{date}</td>
      <td className="session-note">{note}</td>
      <td className="session-time">{formatTime(seconds)}</td>
    </tr>
  );
}

Session.propTypes = {
  session: PropTypes.shape({
    date: PropTypes.string,
    note: PropTypes.string,
    seconds: PropTypes.number,
  }).isRequired,
  formatTime: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

