import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC5EWplrJZ-lmaXO1VY7h8aQ_QWpnUf5u0",
  authDomain: "goodbooks-15f6a.firebaseapp.com",
  projectId: "goodbooks-15f6a",
  storageBucket: "goodbooks-15f6a.appspot.com",
  messagingSenderId: "502713293372",
  appId: "1:502713293372:web:aad9fe67d7a6042b974139",
  measurementId: "G-9KBQ3SKLH6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();

export { auth, firestore, firebaseApp };
export default firebase;
