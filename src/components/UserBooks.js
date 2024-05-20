// src/components/UserBooks.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { List, ListItem, ListItemText, Container, Typography } from '@mui/material';

function UserBooks({ user }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksRef = firestore.collection('books').where('userId', '==', user.uid);
      const snapshot = await booksRef.get();
      const booksData = snapshot.docs.map(doc => doc.data());
      setBooks(booksData);
    };

    fetchBooks();
  }, [user]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>My Books</Typography>
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
