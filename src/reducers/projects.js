import moment from 'moment';

const projectsReducerDefaultState = [];

export default (state = projectsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return [...state, action.project];
    case 'DELETE_PROJECT':
      return state.filter(p => p.id !== action.id);
    case 'FINISH_PROJECT':
      // change the archived prop value
      return state.map((project) => {
        if (project.id === action.id) {
          return {
            ...project,
            archived: moment().format('dddd, DD MM YYYY'),
          };
        }
        return project;
      });
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
    default: return state;
  }
};
