import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import AddBook from './components/AddBook';
import UserBooks from './components/UserBooks';
import UserProfile from './components/UserProfile';
import Navbar from './components/Navbar';
import SearchUsers from './components/SearchUsers';
import FriendRequests from './components/FriendRequests';
import FriendsBooks from './components/FriendsBooks';
import Logout from './components/Logout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

const theme = createTheme();

const MainContainer = styled('div')({
  flexGrow: 1,
  textAlign: 'center',
});

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MainContainer>
          <Navbar user={user} />
          <Routes>
            <Route path="/" element={user ? <Home user={user} /> : <Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/addbook" element={<AddBook user={user} />} />
            <Route path="/userbooks" element={<UserBooks user={user} />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/searchusers" element={<SearchUsers user={user} />} />
            <Route path="/friendrequests" element={<FriendRequests user={user} />} />
            <Route path="/friendsbooks" element={<FriendsBooks user={user} />} />
            <Route path="/logout" element={<Logout />} /> {/* Route for logging out */}
          </Routes>
        </MainContainer>
      </ThemeProvider>
    </Router>
  );
}

export default App;
