import uuid from 'uuid';
import moment from 'moment';

// ADD_PROJECT
// EDIT_PROJECT
// DELETE_PROJECT
// FINISH_PROJECT

export const addProject = ({ name = '', description = '' }) => {
  const project = {
    id: uuid(),
    name: name.toLowerCase().trim(),
    description: description.toLowerCase().trim(),
    sessions: [],
    startDate: moment().unix(),
    archived: '',
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

export const deleteProject = id => ({
  type: 'DELETE_PROJECT',
  id,
});

export const finishProject = id => ({
  type: 'FINISH_PROJECT',
  id,
});

