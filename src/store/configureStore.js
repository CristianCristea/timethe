import { createStore, combineReducers } from 'redux';
import projectsReducer from '../reducers/projects';
// import filtersReducer from '../reducers/filters';

const initialState = { projects: [] };

export default () => {
  const store = createStore(combineReducers({
    projects: projectsReducer,
  }), initialState);

  return store;
};
