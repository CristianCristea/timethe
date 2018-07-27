import firebase from 'firebase/app';
import 'firebase/database';
// set the database values to the env variables
// the values are provided based on the env (test or dev) in the index.js file

// load config values from coresponding file(.env.test or .env.development)
// save data to the development or test databese(firebase)

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);
const database = firebase.database();

export { firebase, database as default };
