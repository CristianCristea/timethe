import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Jumbotron } from 'reactstrap';

const NotFound = () => (
  <Container>
    <Row>
      <Col>
        <Jumbotron className="mt-5 text-center">
          <h2>
            The page you are looking does not exist or has been moved.
          </h2>
          <Link to="/" className="btn btn-secondary mt-5">
            Back to dashboard
          </Link>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);

export default NotFound;
