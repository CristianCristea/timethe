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

function renderProject(name) {
  // TODO: render project html
  return `<li class="project mb-2">
  <div class="card">
    <div class="card-body">
      <a href="projects/project-one.html">
        <h5 class="card-title">${name}</h5>
      </a>
      <div class="status mr-3">
        <span class="oi oi-media-record mr-1 open"></span>
        <span class="mr-2">open</span>
      </div>
      <a href="#" class="btn btn-danger" data-toggle="modal" data-target="#projectSettings" role="button">Settings</a>
    </div>
  </div>
</li>`;
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
    this.renderProject(formData[0].value);

    // hide modal and  reset form
    $("#newProject").modal("hide");
    $(e.target)[0].reset();
  },

  renderProject: function(name) {
    const $projects = $("#projects");
    let project = `<li class="project mb-2">
      <div class="card">
        <div class="card-body">
          <a href="projects/project-one.html">
            <h5 class="card-title">${name}</h5>
          </a>
          <div class="status mr-3">
            <span class="oi oi-media-record mr-1 open"></span>
            <span class="mr-2">running</span>
          </div>
          <a href="#" class="btn btn-danger" data-toggle="modal" data-target="#projectSettings" role="button">Settings</a>
        </div>
      </div>
    </li>`;
    $projects.append(project);
  },

  renderProjects: function(projects) {},
  setProject: function(project) {
    const state = JSON.parse(localStorage.getItem("state")) || { projects: [] };
    state.projects.push(project);
    localStorage.setItem("state", JSON.stringify(state));

    console.log(localStorage);
  },

  getState: function() {
    return localStorage.state;
  },

  init: function() {
    let self = this;

    $newProject = $("#newProject");
    $newProject.find("form").on("submit", function(e) {
      e.preventDefault();
      // create, store and render project
      self.createProject(e);
    });
  }
};

// function renderProjects(arr, domNode) {
//   let html = "";
//   // render projects
//   state.projects.map(project => (html += renderProject(project.name)));
//   domNode.html(html);
// }

// on submit addProject form
// create new Project with the form data
//
$(function() {
  app.init();
});

// $newProject = $("#newProject");
// $newProject.find("form").on("submit", function(e) {
//   e.preventDefault();
//   let form = e.target;
//   let name = form.name.value;
//   let description = form.description.value;

//   state.projects.push(new Project(name, description));
//   $newProject.modal("hide");

//   // render project
//   $("#projects").append(renderProject(name));

//   // reset form
//   $(this).reset();
// });
