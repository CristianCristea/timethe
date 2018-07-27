const projectsReducerDefaultState = [];

export default (state = projectsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return [...state, action.project];
    case 'DELETE_PROJECT':
      return state.filter(p => p.id !== action.id);
    case 'EDIT_PROJECT':
      return state.map((project) => {
        if (project.id === action.id) {
          return {
            ...project,
            ...action.updates,
          };
        }

        return project;
      });
    case 'SET_PROJECTS':
      return action.projects;
    default: return state;
  }
};
