import React from "react";
import Header from "./Header";
import CreateProject from "./CreateProject";
import Projects from "./Projects";

const Homepage = ({
  projects,
  handleDeleteProjects,
  handleDeleteProject,
  handleAddProject
}) => {
  return (
    <div className="homepage">
      <Header title="TIMETHE" subtitle="Track the time you work on projects" />
      <CreateProject handleAddProject={handleAddProject} />
      <Projects
        projects={projects}
        handleDeleteProjects={handleDeleteProjects}
        handleDeleteProject={handleDeleteProject}
      />
    </div>
  );
};

export default Homepage;
