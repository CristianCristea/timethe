import { createStore, combineReducers } from 'redux';
import projectsReducer from '../reducers/projects';
// import filtersReducer from '../reducers/filters';

export default () => {
  const store = createStore(combineReducers({
    projects: projectsReducer,
  }), []);

  return store;
};
