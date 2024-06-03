import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

const addBookToFirestore = async (title, author, rating, userId, setBooks) => {
  try {
    await firestore.collection('books').add({
      title,
      author,
      rating,
      userId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() // Set timestamp to current server time
    });
    console.log('Book added successfully!');

    const booksCollection = await firestore.collection('books').get();
    setBooks(booksCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  } catch (error) {
    console.error('Error adding book:', error);
  }
};


export { auth, firestore, firebaseApp, addBookToFirestore };
export default firebase;
