import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import Projects from '../../Projects/index';
import MainNav from '../../UI/MainNav';


const HomePage = ({ projects }) => (
  <div className="homepage">
    <MainNav />
    <Container>
      <Row>
        <Col>
          <Link to="/create-project" className="btn btn-primary btn-lg mb-5">
            Create Project
          </Link>
        </Col>
      </Row>
    </Container>

    <Projects projects={projects} />

  </div>
);

export default HomePage;

HomePage.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};
