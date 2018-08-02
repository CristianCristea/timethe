/* global describe, it, expect, beforeEach */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import projects from '../fixtures/projects';
import database from '../firebase/firebase';
import {
  addProject,
  startAddProject,
  editProject,
  deleteProject,
  setProjects,
  startSetProjects,
  startDeleteProject,
  startEditProject,
} from './projects';

const createMockStore = configureMockStore([thunk]);
const uid = 'userTestID';
// default user auth for mock store
const defaultAuthState = { auth: { uid } };

beforeEach((done) => {
  const projectsData = {};

  projects.forEach((project) => {
    const {
      id,
      name,
      description,
      sessions,
      startDate,
      archived,
    } = project;

    projectsData[id] = {
      name,
      description,
      sessions,
      startDate,
      archived,
    };
  });
  database.ref(`users/${uid}/projects`).set(projectsData).then(() => done());
});

describe('project actions', () => {
  it('should setup add project action object with passed values', () => {
    const action = addProject(projects[0]);

    expect(action).toEqual({
      type: 'ADD_PROJECT',
      project: projects[0],
    });
  });

  // for async test use done arg, call it after assertions
  it('should add project to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const projectData = {
      name: 'test name',
      description: 'test desc',
    };

    store.dispatch(startAddProject(projectData)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_PROJECT',
        project: {
          id: expect.any(String),
          startDate: expect.any(Number),
          archived: '',
          ...projectData,
        },
      });

      // return promise for chaining
      // firebase will not set an empty sessions object
      return database.ref(`users/${uid}/projects/${actions[0].project.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual({
        startDate: expect.any(Number),
        archived: '',
        ...projectData,
      });
      done();
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

  it('should update the project from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const { id } = projects[2];
    const updates = { name: 'edited' };

    store.dispatch(startEditProject(id, updates))
      .then(() => {
        const action = store.getActions()[0];
        expect(action).toEqual({
          type: 'EDIT_PROJECT',
          id,
          updates,
        });

        return database.ref(`users/${uid}/projects/${id}`).once('value');
      })
      .then((snapshot) => {
        expect(snapshot.val().name).toBe(updates.name);
        done();
      });
  });

  it('should setup remove project action object', () => {
    const action = deleteProject('123abc');

    expect(action).toEqual({
      type: 'DELETE_PROJECT',
      id: '123abc',
    });
  });

  it('should remove the project from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const { id } = projects[2];

    store.dispatch(startDeleteProject(id)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'DELETE_PROJECT',
        id,
      });
      return database.ref(`users/${uid}/projects/${id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
  });

  it('should setup set projects action object with data', () => {
    const action = setProjects(projects);

    expect(action).toEqual({
      type: 'SET_PROJECTS',
      projects,
    });
  });

  it('should fetch the projects from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetProjects()).then(() => {
      const actions = store.getActions();
      // delete project.sessions because firebase does not support empty objects
      const firebaseProjects = projects.map((p) => {
        delete p.sessions;
        return p;
      });

      expect(actions[0]).toEqual({
        type: 'SET_PROJECTS',
        projects: firebaseProjects,
      });
    });
    done();
  });
});
