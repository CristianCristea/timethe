import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
import './header.css';

export default function Header({ title, subtitle }) {
  return (
    <header>
      <Jumbotron className="m-0 hero text-center">
        <Container>
          <Row>
            <Col>
              <Link
                to={`${process.env.PUBLIC_URL}/dashboard`}
                className="display-3 m-0 logo"
              >
                {title}
              </Link>
              <p className="lead">{subtitle}</p>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
