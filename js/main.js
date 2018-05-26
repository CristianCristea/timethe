// track the time spent on a project
// handle multiple projects
// choose the activeProject to work on
// use sessions to track the time
// be able to start, pause, end session
// store the sessions
// store total time on project
// end project - add to archive
// reopen project (update)

// data structure
// project - {id: number, name: string, description: string, totalTime: number, sessions - {date: duration}, startDate: string, endDate: string, updates: number}
// projects - []
// timer - number - miliseconds

// workflow
// create a project - display info
// show next session
// start session
// pause-unpause session
// end session - update project(totalTime, session)

function Project(name, description) {
  const today = new Date().toDateString();

  this.name = name;
  this.description = description;
  this.sessions = [];
  this.currentSession = new Session();
  this.totalTime = 0;
  this.startDate = today;
  this.endDate = "";
  this.updates = 0;
  this.defaultUser = "@cristian";

  this.generateId();
}

Project.prototype.generateId = function() {
  this.id =
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9);
};

function Session() {
  // initiate a new timer
  this.clock = new Timer();
  this.date = new Date().toDateString();
  this.time = this.clock.totalTime;
}

Session.prototype.onStart = function() {
  // start timer
  this.clock.onStart();
  // TODO: html - show time, change start btn to pause
};

Session.prototype.onStop = function() {
  this.clock.onStop();
  // TODO: html: ask for end session confirmation, stop clock, display info-panel with session info, add timer.totalTime to session.time, add session.time to project.totalTime, add session to project.sessions, remove timer from session?
};

Session.prototype.onPause = function() {
  this.clock.onPause();
};

function Timer() {
  this.start = 0;
  this.elapsedTime = 0;
  this.pauseTime = 0;
  this.totalTime = 0;
  this.running = false;
  this.timer = null;
}

Timer.prototype.onStart = function() {
  this.start = Date.now();
  this.running = true;
  this.timer = setInterval(this.onTick.bind(this), 100);
};

Timer.prototype.onTick = function() {
  let now = Date.now();

  this.elapsedTime = now - this.start;
  this.totalTime = this.elapsedTime + this.pauseTime;
  this.display();
};

Timer.prototype.onStop = function() {
  this.running = false;
  clearInterval(this.timer);
};

Timer.prototype.onPause = function() {
  if (this.running) {
    this.onStop();
    this.pauseTime = this.totalTime;
    this.display();
  } else {
    this.onStart(this.pauseTime);
  }
};

Timer.prototype.display = function() {
  console.log(Math.floor(this.totalTime / 1000));
};

function Display(data) {
  this.data = data;
}

const app = {
  createProject: function(e) {
    let form = e.target;
    let formData = $(e.target)
      .first()
      .serializeArray();
    let name = formData[0].value;
    let description = formData[1].value;
    let project = new Project(name, description);
    // save in localStorate
    this.setProject(project);

    // render project
    $("#projects").append(this.createProjectMarkup(name));

    // hide modal and  reset form
    $("#newProject").modal("hide");
    $(e.target)[0].reset();
  },

  createProjectMarkup: function(name) {
    return `<li class="project mb-2">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <div class="status mr-3 d-none">
          <span class="oi oi-media-record mr-1 open"></span>
          <span class="mr-2">running</span>
        </div>
        <button class="btn btn-danger" data-toggle="modal" data-target="#projectSettings" role="button">Settings</button>
      </div>
    </div>
  </li>`;
  },

  renderProjects: function(projects) {
    let markup = "";
    projects.forEach(
      project => (markup += this.createProjectMarkup(project.name))
    );
    $("#projects").html(markup);
  },

  setProject: function(project) {
    let state = this.getState() || { projects: [] };
    state.projects.push(project);
    localStorage.setItem("state", JSON.stringify(state));
  },

  getState: function() {
    return localStorage.state
      ? JSON.parse(localStorage.getItem("state"))
      : null;
  },

  setState: function(newState) {
    localStorage.setItem("state", JSON.stringify(newState));
  },

  renderProjectPage: function(project) {
    let { name, description } = project;
    $("#projectTitle").text(name);
    $("#projectDescription").text(description);
  },

  updateProject: function(projects, index, newName, newDescription) {
    // update project
    let updatedProject = projects[index];
    updatedProject.name = newName;
    updatedProject.description = newDescription;

    // update the state
    projects.splice(index, 1, updatedProject);
    this.setState({ projects });
  },

  getProjectIndex: function(e, projects) {
    let projectIndex = $(e.currentTarget)
      .find("li")
      .index($(e.target).parents("li"));

    // 0 based
    return projectIndex;
  },
  // select project
  selectProject: function(i, projects) {
    return projects[i];
  },

  deleteProject: function(index, projects) {
    let project = projects[index];
    projects.splice(index, 1);
    this.setState({ projects });
  },

  init: function() {
    let self = this;
    let $projectsList = $("#projects");
    // console.log(self.getState());
    // render projects from localStorage - initial state
    if (self.getState()) {
      let projects = self.getState().projects;
      self.renderProjects(projects);
    }

    // create, store and render a new project on form submit
    $("#newProject")
      .find("form")
      .on("submit", function(e) {
        e.preventDefault();
        self.createProject(e);
      });

    // render single project
    $projectsList.click(function(e) {
      // select project
      let projects = self.getState().projects;
      let projectIndex = self.getProjectIndex(e, projects);
      let project = self.selectProject(projectIndex, projects);
      console.log(projectIndex);
      let { name, description } = project;
      if (e.target.tagName !== "BUTTON") {
        // hide projects list and new project btn
        $(".projects, .call-to-action").addClass("d-none");

        // display single page
        $(".single-project").addClass("d-block");

        // render single project
        self.renderProjectPage(project);
      }

      // fill form with initial data
      $("#projectSettings")
        .find("#name")
        .val(name)
        .end()
        .find("#description")
        .val(description);

      $("#projectSettings")
        .find("form")
        .submit(function(e) {
          e.preventDefault();
          let formData = $(this).serializeArray();
          console.log($(this).serializeArray());
          let newName = formData[0].value;
          let newDescription = formData[1].value;
          self.updateProject(projects, projectIndex, newName, newDescription);

          // hide modal
          $(this)
            .parents("#projectSettings")
            .modal("hide");

          // re-render projects
          self.renderProjects(projects);
        });

      $("button[name='delete']").click(function(e) {
        e.preventDefault();
        self.deleteProject(projectIndex, projects);
        // hide modal
        $(this)
          .parents("#projectSettings")
          .modal("hide");
        self.renderProjects(projects);
      });
    });
  }
};

$(function() {
  app.init();
});

// TODO: settings end
// TODO: sessions: start, stop, display
