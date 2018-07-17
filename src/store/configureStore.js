import { createStore, combineReducers } from 'redux';
import projectsReducer from '../reducers/projects';
import helpersReducer from '../reducers/helpers';
// import filtersReducer from '../reducers/filters';

const initialState = { projects: [] };

export default () => {
  const store = createStore(
    combineReducers({
      projects: projectsReducer,
      helpers: helpersReducer,
    }),
    initialState,
    // redux dev tools
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  return store;
};
