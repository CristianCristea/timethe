/* global describe, it, expect */
import moment from 'moment';
import projects from '../fixtures/projects';
import projectsReducer from '../reducers/projects';

describe('projects reducer', () => {
  it('should initiate state', () => {
    const action = {
      type: '@@INIT',
    };
    const state = projectsReducer(undefined, action);

    expect(state).toEqual([]);
  });

  it('should add a project', () => {
    const project = {
      id: '96238fca-d13e-409e-845a-07364a5c4c00',
      name: 'aaaaa2',
      description: 'sasssasaassa3',
      sessions: [],
      startDate: moment(0).add(10, 'days').valueOf(),
      archived: '',
    };
    const action = {
      type: 'ADD_PROJECT',
      project,
    };

    const state = projectsReducer(projects, action);

    expect(state).toEqual([...projects, project]);
  });

  it('should delete a project', () => {
    const id = '96238fca-d13e-409e-845a-07364a5c4c15';
    const action = {
      type: 'DELETE_PROJECT',
      id,
    };
    const state = projectsReducer(projects, action);

    expect(state).toEqual([projects[0], projects[2], projects[3]]);
  });

  it('should not delete a project with invalid id', () => {
    const id = '-1';
    const action = {
      type: 'DELETE_PROJECT',
      id,
    };
    const state = projectsReducer(projects, action);

    expect(state).toEqual(projects);
  });

  it('should edit a project', () => {
    const id = '96238fca-d13e-409e-845a-07364a5c4c15';
    const updates = {
      name: 'alphabet.com',
    };
    const action = {
      type: 'EDIT_PROJECT',
      id,
      updates,
    };
    const state = projectsReducer(projects, action);

    expect(state[1].name).toBe(updates.name);
  });

  it('should not edit a project with invalid id', () => {
    const id = '-1';
    const updates = {
      name: 'alphabet.com',
    };
    const action = {
      type: 'EDIT_PROJECT',
      id,
      updates,
    };
    const state = projectsReducer(projects, action);

    expect(state).toEqual(projects);
  });

  it('should set projects', () => {
    const action = {
      type: 'SET_PROJECTS',
      projects: [projects[2]],
    };
    const state = projectsReducer(projects, action);

    expect(state).toEqual([projects[2]]);
  });
});
