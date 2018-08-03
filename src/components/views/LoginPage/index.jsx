import React from 'react';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import { connect } from 'react-redux';
import { startLogin } from '../../../actions/auth';
import GoogleButton from 'react-google-button';
import './LoginPage.css';

export const LoginPage = ({ startLogin }) => (
  <Container className="login-page">
    <Row>
      <Col>
        <Jumbotron className="login-page__jumbotron">
          <h4 className="mb-5">Project time tracker</h4>
          <GoogleButton
            className="login-page__google-signin-btn"
            id="login-page__google-signin-btn"
            onClick={startLogin}
          />
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);


const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
