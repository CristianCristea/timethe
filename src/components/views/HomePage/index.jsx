import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import Projects from '../../Projects/index';
import MainNav from '../../UI/MainNav';


export default function HomePage({ match }) {
  return (
    <div className="homepage">
      <MainNav />
      <Container>
        <Row>
          <Col>
            <Link to="/create-project" className="btn btn-success btn-lg mb-5">
              Create Project
            </Link>
          </Col>
        </Row>
      </Container>
      <Projects archive={match.url} />
    </div>
  );
}

HomePage.propTypes = {
  match: PropTypes.object.isRequired,
};
