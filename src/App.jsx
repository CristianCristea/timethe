import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/UI/Header';
import ProjectForm from './components/Project/Form';
import HomePage from './components/views/HomePage';
import ProjectPage from './components/views/ProjectPage';
import NotFound from './components/404';

class App extends Component {
  state = {
    projects: [
      { id: 'uniq_id', name: 'test', description: 'test description' },
      { id: 'uniq_id2', name: 'test2', description: 'test description2' },
    ],
  };

  handleAddProject = project => (this.setState(prevState =>
    ({ projects: prevState.projects.concat(project) })));

  handleEditProject = (project) => {
    const { projects } = this.state;
    const newProjects = projects.map(p => (p.id === project.id ? project : p));

    this.setState({ projects: newProjects });
  };

  handleDeleteProjects = () => {
    this.setState(() => ({ projects: [] }));
  };

  handleDeleteProject = (projectToRemove) => {
    this.setState(prevState => ({
      projects: prevState.projects.filter(project => project !== projectToRemove),
    }));
  };

  filterProject = (propKey, propValue, projects) =>
    (projects.filter(project => propValue === project[propKey])[0]);
  ;

  render() {
    const { projects } = this.state;
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
              render={() => (
                <HomePage
                  projects={projects}
                />
              )}
            />
            <Route
              path="/projects/:name"
              render={props => (
                <ProjectPage
                  projects={projects}
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
              render={(props) => {
                const project = this.filterProject('name', props.match.params.name, projects);
                return (<ProjectForm
                  handleEditProject={this.handleEditProject}
                  currentProject={project}
                  edit
                  {...props}
                />);
              }}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
