import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Jumbotron } from "reactstrap";

export default function Header({ title, subtitle }) {
  return (
    <header>
      <Jumbotron>
        <Container>
          <Row>
            <Col>
              <h1 className="display-3">{title}</h1>
              <p className="lead">{subtitle}</p>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired
};
