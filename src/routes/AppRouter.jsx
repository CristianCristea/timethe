import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import Header from '../components/UI/Header';
import ProjectForm from '../components/Project/Form';
import Dashboard from '../components/views/Dashboard';
import ActiveProject from '../components/views/ActiveProject';
import ArchiveProject from '../components/views/ArchiveProject';
import LoginPage from '../components/views/LoginPage';
import NotFound from '../components/404';
import './AppRouter.css';
import '../firebase/firebase';

export const history = createHistory();

function AppRouter() {
  return (
    <Router history={history}>
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
              component={LoginPage}
            />
            <Route
              exact
              path="/dashboard"
              component={Dashboard}
            />
            <Route
              path="/archive"
              exact
              component={Dashboard}
            />
            <Route
              path="/archive/:name"
              render={props => (<ArchiveProject {...props} />)}
            />
            <Route
              path="/projects/:name"
              render={props => (<ActiveProject {...props} />)}
            />
            <Route
              path="/create-project"
              render={props => (
                <ProjectForm {...props} />
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
    </Router>
  );
}

const mapStateToProps = state => ({
  projects: state.projects,
});

export default connect(mapStateToProps)(AppRouter);
