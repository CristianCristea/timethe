import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import * as JsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { connect } from 'react-redux';
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
      archivedProjects: newState.archivedProjects,
    });
  }

  getTotalSessionsTime = sessions => (
    sessions.reduce((total, session) => (total + session.seconds), 0)
  );

  updateStorage = newState => (
    localStorage.setItem('data', JSON.stringify(newState))
  )

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

    // add new session
    currentProject.sessions = [...currentProject.sessions, session];
    const newProject = currentProject;

    // replace old project with newProject
    this.handleEditProject(newProject);
    // close session
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

  capitalizeString = s => (s[0].toUpperCase() + s.substring(1));

  handleGeneratePDF = (project, totalSessionsTime) => {
    const {
      name,
      description,
      sessions,
      startDate,
      archiveDate,
    } = project;
    const doc = new JsPDF('p', 'pt', 'a4');
    const sessionTableColumns = ['#', 'Date', 'Note', 'Time'];
    const sessionTableRows = sessions.map((s, i) => {
      const formatSession = Object.values(s);
      formatSession.splice(-1, 1, totalSessionsTime);

      return [i + 1, ...formatSession];
    });
    const titleMarginLeft = 40;
    const titleMarginTop = 30;
    const descriptionMarginTop = titleMarginTop + 50;

    // PDF options
    doc.setFontSize(16);

    // set max text length
    const splitTitle = doc.splitTextToSize(this.capitalizeString(name), 300);
    const splitDescription = doc.splitTextToSize(description, 500);

    // generate PDF
    doc.autoTable(
      sessionTableColumns,
      sessionTableRows,
      {
        columnStyles: {
          id: { fillColor: 255 },
        },
        margin: { top: descriptionMarginTop + 200 },
        addPageContent() {
          doc.text(splitTitle, titleMarginLeft, titleMarginTop);
          doc.text(splitDescription, titleMarginLeft, descriptionMarginTop);
          doc.text(`${startDate} - ${archiveDate}`, titleMarginLeft, descriptionMarginTop + 150);
        },
      },
    );

    doc.save('document.pdf');
  }

  render() {
    const { archivedProjects } = this.state;

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
                  const project = this.filterProject('name', props.match.params.name, archivedProjects);
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
  }
}

export default connect(mapStateToProps)(App);
