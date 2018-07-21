/* global describe, it, expect */

import { addProject, editProject, deleteProject, finishProject } from '../../src/actions/projects';

describe('project actions', () => {
  it('should setup add project action object with default values', () => {
    const project = { name: '', description: '' };
    const action = addProject(project);

    expect(action).toEqual({
      type: 'ADD_PROJECT',
      project: {
        ...project,
        id: expect.any(String),
        startDate: expect.any(Number),
        archived: expect.any(String),
        sessions: expect.any(Array),
      },
    });
  });

  it('should setup add project action object with passed values', () => {
    const project = { name: 'Test Name', description: 'Test description' };
    const action = addProject(project);

    expect(action).toEqual({
      type: 'ADD_PROJECT',
      project: {
        name: 'test name',
        description: 'test description',
        id: expect.any(String),
        startDate: expect.any(Number),
        archived: expect.any(String),
        sessions: expect.any(Array),
      },
    });
  });

  it('should setup edit project action object ', () => {
    const action = editProject('123abc', { name: 'Edited Name', note: 'Added note' });

    expect(action).toEqual({
      type: 'EDIT_PROJECT',
      id: '123abc',
      updates: {
        name: 'Edited Name',
        note: 'Added note',
      },
    });
  });

  it('should setup remove project action object', () => {
    const action = deleteProject('123abc');

    expect(action).toEqual({
      type: 'DELETE_PROJECT',
      id: '123abc',
    });
  });

  it('should setup toggle project action object ', () => {
    const action = finishProject('123abc');

    expect(action).toEqual({
      type: 'FINISH_PROJECT',
      id: '123abc',
    });
  });
});
