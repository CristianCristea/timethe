import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import Header from './components/UI/Header';
import ProjectForm from './components/Project/Form';
import HomePage from './components/views/HomePage';
import ProjectPage from './components/views/ProjectPage';
import NotFound from './components/404';
import './App.css';

class App extends Component {
  state = {
    activeSession: false,
    projects: [
      {
        id: 'uniq_id',
        name: 'test',
        description: 'test description',
        sessions: [
          { date: moment().format('dddd, MMMM Do YYYY'), seconds: 4323, note: 'A simple note on test project' }, { date: moment().format('dddd, MMMM Do YYYY'), seconds: 2133, note: 'A simple note on test project2' },
          { date: moment().format('dddd, MMMM Do YYYY'), seconds: 4223, note: 'A simple note on test project3' },
          { date: moment().format('dddd, MMMM Do YYYY'), seconds: 4323, note: 'A simple note on test project4' },
          { date: moment().format('dddd, MMMM Do YYYY'), seconds: 1321, note: 'A simple note on test project5' },
          { date: moment().format('dddd, MMMM Do YYYY'), seconds: 7564, note: 'A simple note on test project6' },
        ],
        startDate: moment().format('dddd, MMMM Do YYYY'),
      },
      {
        id: 'uniq_id3',
        name: 'test3',
        description: 'test description2',
        sessions: [],
        startDate: moment().format('dddd, MMMM Do YYYY'),
      },
      {
        id: 'uniq_id2',
        name: 'test2',
        description: 'test description2',
        sessions: [],
        startDate: moment().format('dddd, MMMM Do YYYY'),
      },
    ],
    archivedProjects: [],
  };

  getTotalSessionsTime = sessions => (
    sessions.reduce((total, session) => (total + session.seconds), 0)
  );

  handleAddProject = project => (this.setState(prevState =>
    ({ projects: prevState.projects.concat(project) })));

  handleArchiveProject = project => (this.setState(prevState =>
    ({ archivedProjects: prevState.archivedProjects.concat(project) })));

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

  handleFinishProject = (project) => {
    this.handleArchiveProject(project);
    this.handleDeleteProject(project);
  }

  filterProject = (propKey, propValue, projects) =>
    (projects.filter(project => propValue === project[propKey])[0]);

  startSession = () => {
    this.setState({ activeSession: true });
  }

  addSession = (projectId, session) => {
    const updatedProjects = this.state.projects.map(p => (
      p.id === projectId ? p.sessions.concat(session) : p));
    this.setState({ projects: updatedProjects });
  }

  endSession = (data) => {
    // addSession
    const {
      date,
      note,
      seconds,
      currentProject,
    } = data;
    const session = {
      date,
      note,
      seconds,
    };

    currentProject.sessions = [...currentProject.sessions, session];
    const newProject = currentProject;

    this.handleEditProject(newProject);
    this.setState({ activeSession: false });
  }

  cancelSession = () => {
    this.setState({ activeSession: false });
  }

  formatTime = (seconds) => {
    const m = Math.floor(seconds / 60) % 60;
    const h = Math.floor(seconds / 3600);
    const isPlural = unit => (unit !== 1 ? 's' : '');

    return `${h} hour${isPlural(h)}  ${m} minute${isPlural(m)}`;
  }


  render() {
    const { projects, archivedProjects } = this.state;

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
                render={() => (
                  <HomePage
                    projects={projects}
                  />
                )}
              />
              <Route
                path="/archived-projects"
                render={() => (
                  <HomePage
                    projects={archivedProjects}
                  />
                )}
              />
              <Route
                path="/projects/:name"
                render={(props) => {
                  const project = this.filterProject('name', props.match.params.name, projects);
                  const totalSessionsTime = this.getTotalSessionsTime(project.sessions);

                  return (
                    <ProjectPage
                      projects={projects}
                      handleEditProject={this.handleEditProject}
                      startSession={this.startSession}
                      activeSession={this.state.activeSession}
                      endSession={this.endSession}
                      cancelSession={this.cancelSession}
                      currentProject={project}
                      formatTime={this.formatTime}
                      totalSessionsTime={this.formatTime(totalSessionsTime)}
                      handleDeleteProject={this.handleDeleteProject}
                      handleFinishProject={this.handleFinishProject}
                      {...props}
                    />
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
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
