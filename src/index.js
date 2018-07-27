/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import dotenv from 'dotenv';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { startSetProjects } from './actions/projects';
import App from './App';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

// set the values for firebase config based on the env test or develoopment
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '../.env.development' });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '../.env.test' });
}

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <App store={store} />
  </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

store.dispatch(startSetProjects()).then(() => {
  ReactDOM.render(jsx, document.getElementById('root'));
});

registerServiceWorker();
