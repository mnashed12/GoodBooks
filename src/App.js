// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import AddBook from './components/AddBook';
import UserBooks from './components/UserBooks';
import Navbar from './components/Navbar';
import { firebaseApp } from './firebase';

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
      <div className="App">
        <Navbar user={user} onSignOut={auth.signOut} />
        <Routes>
          <Route path="/" element={user ? <Home user={user} /> : <Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addbook" element={<AddBook user={user} />} />
          <Route path="/userbooks" element={<UserBooks user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
