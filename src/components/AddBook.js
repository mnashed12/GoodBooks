// src/components/AddBook.js
import React, { useState } from 'react';
import { addBookToFirestore } from '../firebase';
import { TextField, Button, Container, Typography } from '@mui/material';

function AddBook({ user }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBookToFirestore(title, author, rating, user.uid);
      setTitle('');
      setAuthor('');
      setRating('');
    } catch (error) {
      console.error('Error adding book: ', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Add a Book</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Author"
          fullWidth
          margin="normal"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          label="Rating"
          type="number"
          fullWidth
          margin="normal"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">Add Book</Button>
      </form>
    </Container>
  );
}

export default AddBook;
