// src/components/Navbar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Navbar({ user, onSignOut }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          GoodBooks
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/addbook">Add Book</Button>
            <Button color="inherit" component={Link} to="/userbooks">My Books</Button>
            <Button color="inherit" onClick={onSignOut}>Sign Out</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
            <Button color="inherit" component={Link} to="/">Login</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
