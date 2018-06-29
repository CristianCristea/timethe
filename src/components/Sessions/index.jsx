import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import Session from '../Session';

export default function Sessions({ sessions, formatTime }) {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Note</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {sessions.map((s, i) => (
          <Session key={uuid()} session={s} formatTime={formatTime} index={i + 1} />
        ))}
      </tbody>
    </Table>
  );
}

Sessions.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    note: PropTypes.string,
    seconds: PropTypes.number,
  })).isRequired,
  formatTime: PropTypes.func.isRequired,
}

