// TOGGLE_IS_SESSION_ACTIVE

export const toggleIsSessionActive = (isSessionActive) => ({
  type: 'TOGGLE_IS_SESSION_ACTIVE',
  isSessionActive,
});

// export const endSession = (projectId, session) => {
//   return {

//   }
// };

// const project = {
//   id: uuid(),
//   name: name.toLowerCase().trim(),
//   description: description.toLowerCase().trim(),
//   sessions: [],
//   startDate: moment().unix(),
//   archived: '',
// };

// return {
//   type: 'ADD_PROJECT',
//   project,
// };

    // addSession
    // const {
    //   date,
    //   note,
    //   seconds,
    //   currentProject,
    // } = data;
    // const session = {
    //   date,
    //   note,
    //   seconds,
    // };

    // // add new session
    // currentProject.sessions = [...currentProject.sessions, session];
    // const newProject = currentProject;

    // // replace old project with newProject
    // this.handleEditProject(newProject);
    // // close session
    // this.cancelSession();