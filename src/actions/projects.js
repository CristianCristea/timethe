import uuid from 'uuid';
import moment from 'moment';

// ADD_PROJECT
// EDIT_PROJECT
// REMOVE_PROJECT
// TOGGLE_PROJECT

export const addProject = ({ name, description } = {}) => {
  const project = {
    id: uuid(),
    name: name.toLowerCase(),
    description: description.toLowerCase(),
    sessions: [],
    startDate: moment().format('dddd, DD MM YYYY'),
  };

  return {
    type: 'ADD_PROJECT',
    project,
  };
};

export const editProject = (id, updates) => ({
  type: 'EDIT_PROJECT',
  id,
  updates,
});

export const removeProject = ({ id } = {}) => ({
  type: 'REMOVE_PROJECT',
  id,
});
