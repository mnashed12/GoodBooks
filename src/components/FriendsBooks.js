import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { List, ListItem, ListItemText, Container, Typography } from '@mui/material';

function FriendsBooks({ user }) {
  const [friendsBooks, setFriendsBooks] = useState([]);

  useEffect(() => {
    const fetchFriendsBooks = async () => {
      if (!user) return;

      try {
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        const userData = userDoc.data();
        if (userData && userData.friends) {
          const books = [];
          for (const friendId of userData.friends) {
            const friendBooksSnapshot = await firestore.collection('books').where('userId', '==', friendId).get();
            const friendBooks = friendBooksSnapshot.docs.map(doc => doc.data());
            books.push(...friendBooks);
          }
          setFriendsBooks(books);
        } else {
          console.error('No friends found');
        }
      } catch (error) {
        console.error('Error fetching friends\' books: ', error);
      }
    };

    fetchFriendsBooks();
  }, [user]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Friends' Books</Typography>
      <List>
        {friendsBooks.map((book, index) => (
          <ListItem key={index}>
            <ListItemText primary={book.title} secondary={`Author: ${book.author}, Rating: ${book.rating}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default FriendsBooks;
