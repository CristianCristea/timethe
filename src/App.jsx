import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/UI/Header';
import ProjectForm from './components/Project/Form';
import HomePage from './components/views/HomePage';
import ActiveProject from './components/views/ActiveProject';
import ArchiveProject from './components/views/ArchiveProject';
import NotFound from './components/404';
import './App.css';

class App extends Component {
  componentDidMount() {
    // get projects from localstorage
    if (!localStorage.getItem('data')) {
      this.updateStorage(this.state);
    }

    const newState = JSON.parse(localStorage.getItem('data'));
    this.setState({
      projects: newState.projects,
      archivedProjects: newState.archivedProjects,
    });
  }

  updateStorage = newState => (
    localStorage.setItem('data', JSON.stringify(newState))
  )

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <div className="app-body">
            <Header
              title="TIMETHE"
              subtitle="Track the time you work on projects"
            />
            <Switch>
              <Route
                exact
                path="/"
                component={HomePage}
              />
              <Route
                path="/archive"
                exact
                component={HomePage}
              />
              <Route
                path="/archive/:name"
                render={(props) => {
                  return (
                    <ArchiveProject {...props} />
                  );
                }}
              />
              <Route
                path="/projects/:name"
                render={(props) => {
                  return (
                    <ActiveProject {...props} />
                  );
                }
                }
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
                path="/edit-project/:id"
                render={props => (
                  <ProjectForm
                    edit
                    {...props}
                  />)}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  };
};

export default connect(mapStateToProps)(App);
