import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class AlertBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleClick = () => {
    const {
      deleteProject,
      currentProject,
      handleDeleteProject,
      handleFinishProject,
    } = this.props;

    if (deleteProject) {
      handleDeleteProject(currentProject);
    } else {
      handleFinishProject(currentProject);
    }

    this.toggle();
    // redirect to dashboard after form submision
    this.props.history.push('/');
  }

  render() {
    const {
      color,
      btnName,
      className,
      disabled,
    } = this.props;
    return (
      <div>
        <Button color={color} disabled={disabled} onClick={this.toggle}>{btnName}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={className}>
          <ModalHeader toggle={this.toggle}>Warning</ModalHeader>
          <ModalBody>
            <p>
              {this.props.text}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={this.handleClick}
            >
              Yes
            </Button>{' '}
            <Button className="btn-primary" onClick={this.toggle}>No</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AlertBox;

AlertBox.propTypes = {
  btnName: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  handleDeleteProject: PropTypes.func,
  handleFinishProject: PropTypes.func,
  deleteProject: PropTypes.bool,
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
  history: PropTypes.object,
};

AlertBox.defaultProps = {
  text: '',
  btnName: '',
  className: '',
  history: {},
  handleFinishProject: () => false,
  handleDeleteProject: () => false,
  deleteProject: false,
};
