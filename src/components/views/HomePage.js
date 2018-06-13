import React from "react";
import ProjectForm from "../Project/Form";
import Projects from "../Projects/index";

const HomePage = ({
  projects,
  handleDeleteProjects,
  handleDeleteProject,
  handleAddProject
}) => {
  return (
    <div className="homepage">
      <ProjectForm handleAddProject={handleAddProject} />
      <Projects
        projects={projects}
        handleDeleteProjects={handleDeleteProjects}
        handleDeleteProject={handleDeleteProject}
      />
    </div>
  );
};

export default HomePage;
