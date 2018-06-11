import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Homepage from "./components/Homepage";
import ProjectPage from "./components/ProjectPage";

class App extends Component {
  state = {
    projects: [{ id: "uniq_id", name: "test", description: "test description" }]
  };

  handleAddProject = project => {
    const { projects } = this.state;
    const isProjectUniq =
      projects.filter(p => project.name === p.name).length === 0;

    if (!project.name || !project.description) {
      return "Enter valid project name and description";
    } else if (!isProjectUniq) {
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

  selectProject = (projectName, projects) => {
    return projects.filter(project => projectName === project.name)[0];
  };

  render() {
    return (
      <BrowserRouter>
        <div className="app">
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
                  selectProject={this.selectProject}
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
