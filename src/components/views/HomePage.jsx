import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Projects from '../Projects/index';

const HomePage = ({ projects }) => (
  <div className="homepage">
    <Link to="/create-project" className="btn btn-primary btn-lg">
      Create Project
    </Link>
    <Projects projects={projects} />
  </div>
);

export default HomePage;

HomePage.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
};
