import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/UI/Header";
import ProjectForm from "./components/Project/Form";
import HomePage from "./components/views/HomePage";
import ProjectPage from "./components/views/ProjectPage";
import NotFound from "./components/404";

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

  handleEditProject = project => {
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
          .concat(project, prevState.projects.slice(projectIndex + 1))
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
              render={props => (
                <HomePage
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
            />
            <Route
              path="/create-project"
              render={props => (
                <ProjectForm
                  handleAddProject={this.handleAddProject}
                  {...props}
                />
              )}
            />
            <Route
              path="/edit-project/:name"
              render={props => (
                <ProjectForm
                  handleEditProject={this.handleEditProject}
                  filterProject={this.filterProject}
                  projects={this.state.projects}
                  edit={true}
                  {...props}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
