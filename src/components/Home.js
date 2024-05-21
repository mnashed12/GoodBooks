import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase';
import Button from '@mui/material/Button';

const Home = ({ user }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchBooks = async () => {
        const booksCollection = await firestore.collection('books').get();
        setBooks(booksCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      };
      fetchBooks();
    }
  }, [user]);

  return (
    <div>
      <h2>Welcome, {user ? user.email : 'Guest'}</h2>
      <p>Welcome to GoodBooks, a social network for book lovers! Connect with other readers, discover new books, and share your thoughts and recommendations.</p>
      
      {/* Render signup and login buttons if user is not signed in */}
      {!user && (
        <div>
          <Button color="primary" component={Link} to="/signup">Sign Up</Button>
          <Button color="primary" component={Link} to="/">Login</Button>
        </div>
      )}

      {/* Render other content for the home page */}
    </div>
  );
};

export default Home;
