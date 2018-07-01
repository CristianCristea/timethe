import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import * as jsPDF from 'jspdf';
import Header from './components/UI/Header';
import ProjectForm from './components/Project/Form';
import HomePage from './components/views/HomePage';
import ActiveProject from './components/views/ActiveProject';
import ArchiveProject from './components/views/ArchiveProject';
import NotFound from './components/404';
import './App.css';

class App extends Component {
  state = {
    activeSession: false,
    projects: [],
    archivedProjects: [],
  };

  componentDidMount() {
    // get projects from localstorage
    if (!localStorage.getItem('data')) {
      this.updateStorage(this.state);
    }

    const newState = JSON.parse(localStorage.getItem('data'));
    this.setState({
      projects: newState.projects,
      archivedProjects: newState.archivedProjects
    });
  }

  getTotalSessionsTime = sessions => (
    sessions.reduce((total, session) => (total + session.seconds), 0)
  );

  handleAddProject = (project) => {
    const { projects } = this.state;

    this.setState({ projects: [...projects, project] },
      () => (this.updateStorage(this.state)),
    );
  }

  updateStorage = newState => (
    localStorage.setItem('data', JSON.stringify(newState))
  )

  handleArchiveProject = (project) => {
    const projectToArchive = {
      ...project,
      archiveDate: moment().format('dddd, MMMM Do YYYY'),
    };

    this.setState(
      prevState => ({ archivedProjects: prevState.archivedProjects.concat(projectToArchive) }),
      () => (this.updateStorage(this.state)),
    );
  }

  handleEditProject = (project) => {
    const { projects } = this.state;
    const newProjects = projects.map(p => (p.id === project.id ? project : p));

    this.setState(
      { projects: newProjects },
      () => (this.updateStorage(this.state)),
    );
  };

  handleDeleteProject = (projectToRemove) => {
    this.setState(
      prevState => (
        { projects: prevState.projects.filter(project => project !== projectToRemove) }),
      () => (this.updateStorage(this.state)),
    );
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

    // replace old project with newProject
    this.handleEditProject(newProject);
    this.cancelSession();
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

  handlePrintProject = () => {
    window.print();
  }

  handleGeneratePDF = () => {
    const doc = new jsPDF();

    doc.text('project to be exported', 15, 15);
    doc.save();
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
                path="/archive"
                exact
                render={() => (
                  <HomePage
                    projects={archivedProjects}
                  />
                )}
              />
              <Route
                path="/archive/:name"
                render={(props) => {
                  const project = this.filterProject('name', props.match.params.name.toLowerCase(), archivedProjects);
                  const totalSessionsTime = this.getTotalSessionsTime(project.sessions);
                  return (
                    <ArchiveProject
                      project={project}
                      totalSessionsTime={this.formatTime(totalSessionsTime)}
                      formatTime={this.formatTime}
                      handlePrintProject={this.handlePrintProject}
                      handleGeneratePDF={this.handleGeneratePDF}
                      {...props}
                    />
                  );
                }}
              />
              <Route
                path="/projects/:name"
                render={(props) => {
                  const project = this.filterProject('name', props.match.params.name.toLowerCase(), projects);
                  const totalSessionsTime = this.getTotalSessionsTime(project.sessions);

                  return (
                    <ActiveProject
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
