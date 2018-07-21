import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { selectProject, formatTime } from '../../selectors/projects';
import Session from '../Session';

const Sessions = ({ currentProject }) => {
  const { sessions } = currentProject;

  return (
    <div className="table-responsive">
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
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  currentProject: selectProject(state.projects, ownProps.projectName),
});
export default connect(mapStateToProps)(Sessions);

Sessions.propTypes = {
  projectName: PropTypes.string.isRequired,
  currentProject: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string,
      note: PropTypes.string,
      seconds: PropTypes.number,
    })),
    startDate: PropTypes.number.isRequired,
  }).isRequired,
};
