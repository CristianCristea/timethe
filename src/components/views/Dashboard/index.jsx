import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import Projects from '../../Projects';
import MainNav from '../../UI/MainNav';


export default function Dashboard({ match }) {
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

Dashboard.propTypes = {
  match: PropTypes.object.isRequired,
};
