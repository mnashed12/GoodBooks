import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase';
import Button from '@mui/material/Button';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css'; // Import CSS for additional styling
import { styled } from '@mui/system'; // Import styled from @mui/system
import Typography from '@mui/material/Typography';


const StyledH3 = styled('h3')({
  textAlign: 'left', 
  marginLeft: '10px', 
});

const StyledDiv = styled('div')({
  marginBottom: '20px', 
  position: 'absolute',
  top: '200px',
  right: '150px',
});

const StyledTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem',
  color: '#333', 
});

const StyledText = styled(Typography)({
  fontSize: '1rem',
  color: '#666', 
});

const Home = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [username, setUsername] = useState('');
  const [bestSellers, setBestSellers] = useState([]);
  const [recentlyUploadedBook, setRecentlyUploadedBook] = useState(null); 

  useEffect(() => {
    if (user) {
      const fetchBooks = async () => {
        const booksCollection = await firestore.collection('books').get();
        setBooks(booksCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      };

      const fetchUserData = async () => {
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUsername(userDoc.data().username);
        }
      };

      fetchBooks();
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    const fetchNYTBestSellers = async () => {
      try {
        const API_KEY = 'SAJVHebNWTGw2Gwny8i2vbnVe9qVzoI7'; 
        const response = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${API_KEY}`);
        const lists = response.data.results.lists;
        const bestSellersData = lists.reduce((acc, list) => acc.concat(list.books), []);
        setBestSellers(bestSellersData);
      } catch (error) {
        console.error('Error fetching best sellers:', error);
      }
    };
    fetchNYTBestSellers();
  }, []);

  useEffect(() => {
    const fetchRecentlyUploadedBook = async () => {
      try {
        const querySnapshot = await firestore.collection('books')
          .orderBy('timestamp', 'desc')
          .limit(1)
          .get();
  
        if (!querySnapshot.empty) {
          const recentBookData = querySnapshot.docs[0].data();
          console.log('Recently uploaded book:', recentBookData); 
          setRecentlyUploadedBook(recentBookData);
        } else {
          console.log('No recently uploaded books found.');
        }
      } catch (error) {
        console.error('Error fetching recently uploaded book:', error);
      }
    };
  
    fetchRecentlyUploadedBook();
  }, []);

  return (
    <div>
      <h2>Welcome, {user ? username : 'Guest'}</h2>
      <p>Welcome to GoodBooks, a social network for book lovers! Connect with other readers, discover new books, and share your thoughts and recommendations.</p>
      
      {!user && (
        <div>
          <Button color="primary" component={Link} to="/signup">Sign Up</Button>
          <Button color="primary" component={Link} to="/">Login</Button>
        </div>
      )}

      <StyledH3 className="nyt-best-sellers">NYT Best Sellers</StyledH3>
      <Carousel showThumbs={false} showStatus={false} showIndicators={false} infiniteLoop useKeyboardArrows>
        {bestSellers.map(book => (
          <div key={book.primary_isbn10} className="carousel-item">
            <img src={book.book_image} alt={book.title} className="book-image" />
          </div>
        ))}
      </Carousel>

      {recentlyUploadedBook && (
        <StyledDiv>
          <StyledTitle>Recently Uploaded Book</StyledTitle>
          <StyledText>Title: {recentlyUploadedBook.title}</StyledText>
          <StyledText>Author: {recentlyUploadedBook.author}</StyledText>
        </StyledDiv>
      )}
    </div>
  );
};

export default Home;
