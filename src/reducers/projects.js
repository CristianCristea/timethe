import moment from 'moment';

const projectsReducerDefaultState = [];

export default (state = projectsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return [...state, action.project];
    case 'DELETE_PROJECT':
      return state.filter(id => id !== action.id);
    case 'TOGGLE_PROJECT':
      return state.map((project) => {
        if (project.id === action.id) {
          return {
            ...project,
            archived: !action.archived,
            archivedDates: [...action.archivedDates, moment().format('dddd, DD MM YYYY')],
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
