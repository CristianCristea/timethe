import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
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
            <PublicRoute
              exact
              path="/"
              component={LoginPage}
            />
            <PrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
            />
            <PrivateRoute
              path="/archive"
              exact
              component={Dashboard}
            />
            <PrivateRoute
              path="/archive/:name"
              component={ArchiveProject}
            />
            <PrivateRoute
              path="/projects/:name"
              component={ActiveProject}
            />
            <PrivateRoute
              path="/create-project"
              component={ProjectForm}
            />
            <PrivateRoute
              path="/edit-project/:id"
              component={ProjectForm}
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
