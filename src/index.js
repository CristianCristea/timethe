/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { firebase } from './firebase/firebase';
import configureStore from './store/configureStore';
import AppRouter, { history } from './routes/AppRouter';
import { startSetProjects } from './actions/projects';
import { login, logout } from './actions/auth';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter store={store} />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  // render the app one single time - only if is not already rendered
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

registerServiceWorker();

// firebase auth
// user.uid is provided by firebase
// dispatch actions based on user login status
// if logged in store the user id in store
// redirect after login or logout
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetProjects()).then(() => {
      renderApp();
      if (history.location.pathname === '/') {
        history.push('/dashboard');
      }
    });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});
