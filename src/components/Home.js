// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';

const Home = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = await firestore.collection('books').get();
      setBooks(booksCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchBooks();
  }, []);

  const handleAddBook = async () => {
    if (newBook.trim() && rating.trim()) {
      const bookRef = await firestore.collection('books').add({
        title: newBook,
        rating: rating,
        user: user.email
      });
      setBooks([...books, { id: bookRef.id, title: newBook, rating: rating, user: user.email }]);
      setNewBook('');
      setRating('');
    }
  };

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      <input
        type="text"
        value={newBook}
        onChange={(e) => setNewBook(e.target.value)}
        placeholder="Book Title"
      />
      <input
        type="text"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        placeholder="Rating"
      />
      <button onClick={handleAddBook}>Add Book</button>
      <h3>Book Ratings</h3>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} - {book.rating} (by {book.user})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
