import React from 'react';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import { connect } from 'react-redux';
import { startLogin } from '../../../actions/auth';

export const LoginPage = ({ startLogin }) => (
  <Container>
    <Row>
      <Col>
        <Jumbotron className="mt-4">
          <h4>Welcome to TIMETHE</h4>
          <button onClick={startLogin}>Login</button>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);


const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
