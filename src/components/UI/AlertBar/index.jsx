import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Row, Col } from 'reactstrap';

export default class AlertBar extends React.Component {
  state = {
    visible: true,
  };

  onDismiss = () => {
    this.setState({ visible: false });
  }

  render() {
    const { color, text } = this.props;
    const { visible } = this.state;

    return (
      <Alert color={color} isOpen={visible} toggle={this.onDismiss}>
        <Row className="m-0">
          <Col>
            <p className="mb-0">{text}</p>
          </Col>
        </Row>
      </Alert>
    );
  }
}

AlertBar.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}