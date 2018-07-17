import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Projects from '../../Projects/index';
import MainNav from '../../UI/MainNav';


export default function HomePage(props) {
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

      <Projects archive={props.match.url} />

    </div>
  );
}
