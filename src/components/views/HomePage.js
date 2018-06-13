import React from "react";
import { Link } from "react-router-dom";
import Projects from "../Projects/index";

const HomePage = ({
  projects,
  handleDeleteProjects,
  handleDeleteProject,
  handleAddProject
}) => {
  return (
    <div className="homepage">
      <Link to="/create-project" className="btn btn-primary btn-lg">
        Create Project
      </Link>
      <Projects projects={projects} />
    </div>
  );
};

export default HomePage;
