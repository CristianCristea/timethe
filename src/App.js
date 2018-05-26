import React, { Component } from "react";
import Header from "./components/Header";
import CreateProject from "./components/CreateProject";
import AddProjectModal from "./components/AddProjectModal";
import Projects from "./components/Projects";

class App extends Component {
  state = {
    projects: ["test1", "test2"]
  };

  handleAddProject = project => {
    console.log("add");
    if (!project) {
      return "Enter valid project name";
    } else if (this.state.projects.indexOf(project) > -1) {
      return "This project already exists";
    }

    this.setState(prevState => {
      return {
        projects: prevState.projects.concat(project)
      };
    });
  };

  handleDeleteProjects = () => {
    this.setState(() => ({ projects: [] }));
  };

  handleDeleteProject = projectToRemove => {
    this.setState(prevState => ({
      projects: prevState.projects.filter(
        project => project !== projectToRemove
      )
    }));
  };

  render() {
    return (
      <div className="app">
        <Header
          title="TIMETHE"
          subtitle="Track the time you work on projects"
        />
        <CreateProject handleAddProject={this.handleAddProject} />
        <Projects
          projects={this.state.projects}
          handleDeleteProjects={this.handleDeleteProjects}
          handleDeleteProject={this.handleDeleteProject}
        />
      </div>
    );
  }
}

export default App;
