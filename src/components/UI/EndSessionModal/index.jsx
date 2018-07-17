import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  FormGroup,
  Input,
} from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import { toggleIsSessionActive } from '../../../actions/helpers';
import { editProject } from '../../../actions/projects';
import { selectProject } from '../../../selectors/projects';


class EndSessionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      note: '',
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { note } = this.state;
    const {
      seconds,
      currentProject,
      editProject,
      toggleIsSessionActive,
      isSessionActive,
    } = this.props;

    const session = {
      date: moment().format('dddd, MMMM Do YYYY'),
      note,
      seconds,
    };

    this.toggle();
    // add action addSesion to projects action creator and to reducer, import it
    editProject(currentProject.id, Object.assign(currentProject, { sessions: currentProject.sessions.concat(session) }));
    toggleIsSessionActive(isSessionActive);
  }

  render() {
    const { note } = this.state;

    return (
      <div>
        <Button color="danger" className="mb-3 ControlBtn" onClick={this.toggle}>Finish</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Do you want to end the session?</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="note">Optional Note</Label>
                <Input
                  type="textarea"
                  value={note}
                  name="note"
                  id="note"
                  onChange={this.handleInput}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              onClick={this.handleSubmit}
            >
              End Session
            </Button>{' '}
            <Button color="secondary" type="reset" onClick={this.toggle}>Back</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { projects } = state;
  const { projectName } = ownProps;
  return {
    currentProject: selectProject(projects, projectName),
    isSessionActive: state.helpers.isSessionActive,
    seconds: ownProps.seconds,
  };
};

const mapDispatchToProps = {
  toggleIsSessionActive,
  editProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(EndSessionModal);

EndSessionModal.propTypes = {
  // className: PropTypes.string,
  seconds: PropTypes.number.isRequired,
  // endSession: PropTypes.func.isRequired,
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

// EndSessionModal.defaultProps = {
//   className: '',
// };
