import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import { startDeleteProject, startEditProject } from '../../../actions/projects';

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
      deleteP,
      projectId,
      startDeleteProject,
      startEditProject,
      history,
    } = this.props;

    if (deleteP) {
      startDeleteProject(projectId);
    } else {
      startEditProject(projectId, { archived: moment().format('dddd, DD MM YYYY') });
    }

    // hide popup
    this.toggle();
    // redirect to dashboard after form submision
    history.push(`${process.env.PUBLIC_URL}/dashboard`);
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

const mapDispatchToProps = {
  startDeleteProject,
  startEditProject,
};

const mapStateToProps = (state, ownProps) => ({
  history: ownProps.history,
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertBox);

AlertBox.propTypes = {
  btnName: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  deleteP: PropTypes.bool,
  projectId: PropTypes.string.isRequired,
  history: PropTypes.object,
  startDeleteProject: PropTypes.func.isRequired,
  startEditProject: PropTypes.func.isRequired,
};

AlertBox.defaultProps = {
  text: '',
  btnName: '',
  className: '',
  history: {},
  deleteP: false,
};

