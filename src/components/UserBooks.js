// src/components/UserBooks.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { List, ListItem, ListItemText, Container, Typography } from '@mui/material';

function UserBooks({ user }) {
  const [books, setBooks] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchBooks = async () => {
        const booksRef = firestore.collection('books').where('userId', '==', user.uid);
        booksRef.onSnapshot(snapshot => {
          const booksData = snapshot.docs.map(doc => doc.data());
          setBooks(booksData);
        });
      };

      const fetchProfile = async () => {
        const profileRef = firestore.collection('users').doc(user.uid);
        const profileDoc = await profileRef.get();
        if (profileDoc.exists) {
          setProfile(profileDoc.data());
        }
      };

      fetchBooks();
      fetchProfile();
    }
  }, [user]);

  return (
    <Container maxWidth="sm">
      {profile && (
        <div>
          <Typography variant="h4" gutterBottom>{profile.username}'s Books</Typography>
          <Typography variant="body1" gutterBottom>Bio: {profile.bio}</Typography>
        </div>
      )}
      <Typography variant="h5" gutterBottom>Books</Typography>
      <List>
        {books.map((book, index) => (
          <ListItem key={index}>
            <ListItemText primary={book.title} secondary={`Author: ${book.author}, Rating: ${book.rating}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default UserBooks;
