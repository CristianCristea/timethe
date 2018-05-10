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
// activeProject - {}

function generateID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

function Project(name, description) {
  const today = new Date().toDateString();

  this.name = name;
  this.description = description;
  this.sessions = [];
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
  this.date = new Date().toDateString();
  this.time = 0; // TODO: call timer - display the time spent
}

function Timer() {
  this.start = 0;
  this.elapsedTime = 0;
  this.pauseTime = 0;
  this.totalTime = 0;
  this.running = false;
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

let test = new Timer();
test.onStart();
