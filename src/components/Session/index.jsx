import React from 'react';
import PropTypes from 'prop-types';

export default function Session({ session, formatTime, index }) {
  const { date, note, seconds } = session;

  return (
    <tr className="Session">
      <th scope="row">{index}</th>
      <td>{date}</td>
      <td>{note}</td>
      <td>{formatTime(seconds)}</td>
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

