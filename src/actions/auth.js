import { firebase, googleAuthProvider } from '../firebase/firebase';

// redux
export const login = uid => ({
  type: 'LOGIN',
  uid,
});

export const logout = () => ({
  type: 'LOGOUT',
});

// firebase login user
export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

// firebase logout user
export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};

