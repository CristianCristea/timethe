import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import ProjectPage from "./components/ProjectPage";

class App extends Component {
  state = {
    projects: [
      { id: "uniq_id", name: "test", description: "test description" },
      { id: "uniq_id2", name: "test2", description: "test description2" }
    ]
  };

  handleAddProject = project => {
    const { projects } = this.state;
    const existingProject = this.filterProject("name", project.name, projects);

    if (!project.name || !project.description) {
      return "Enter valid project name and description";
    } else if (existingProject) {
      return "This project already exists";
    }

    this.setState(prevState => {
      return {
        projects: prevState.projects.concat(project)
      };
    });
  };

  handleEditProject = (
    project = { id: "uniq_id", name: "test", description: "test description" }
  ) => {
    const { projects } = this.state;
    const projectIndex = this.filterProjectIndex(projects, project);
    const prevProject = projects[projectIndex];

    if (!prevProject.name || !prevProject.description) {
      return "Enter a name and description";
    }

    this.setState(prevState => {
      return {
        projects: prevState.projects
          .slice(0, projectIndex)
          .concat(project, prevState.projects.slice(projectIndex))
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

  filterProject = (propKey, propValue, projects) => {
    return projects.filter(project => propValue === project[propKey])[0];
  };

  filterProjectIndex(projects, project) {
    let index = -1;

    projects.forEach((p, i) => {
      if (project.id === p.id) {
        index = i;
      }
    });

    return index;
  }

  handleProjectSettings = () => {};

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header
            title="TIMETHE"
            subtitle="Track the time you work on projects"
          />
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <Homepage
                  handleAddProject={this.handleAddProject}
                  projects={this.state.projects}
                  handleDeleteProjects={this.handleDeleteProjects}
                  handleDeleteProject={this.handleDeleteProject}
                />
              )}
            />
            <Route
              path="/projects/:name"
              render={props => (
                <ProjectPage
                  projects={this.state.projects}
                  filterProject={this.filterProject}
                  handleEditProject={this.handleEditProject}
                  {...props}
                />
              )}
            />;
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
