import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import projectsReducer from '../reducers/projects';
import helpersReducer from '../reducers/helpers';
// import filtersReducer from '../reducers/filters';

// redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      projects: projectsReducer,
      helpers: helpersReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );
  return store;
};
