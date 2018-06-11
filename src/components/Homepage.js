import React from "react";
import FormModal from "./FormModal";
import Projects from "./Projects";

const Homepage = ({
  projects,
  handleDeleteProjects,
  handleDeleteProject,
  handleAddProject
}) => {
  return (
    <div className="homepage">
      <FormModal handleAddProject={handleAddProject} />
      <Projects
        projects={projects}
        handleDeleteProjects={handleDeleteProjects}
        handleDeleteProject={handleDeleteProject}
      />
    </div>
  );
};

export default Homepage;
