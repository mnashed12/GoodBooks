import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

function Navbar({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    navigate('/logout');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
          GoodBooks
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/addbook">Add Book</Button>
            <Button color="inherit" component={Link} to="/userbooks">My Books</Button>
            <Button color="inherit" aria-controls="friends-menu" aria-haspopup="true" onClick={handleMenu}>
              Friends
            </Button>
            <Menu
              id="friends-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/friendsbooks" onClick={handleClose}>Friends' Books</MenuItem>
              <MenuItem component={Link} to="/friendrequests" onClick={handleClose}>Friend Requests</MenuItem>
              <MenuItem component={Link} to="/searchusers" onClick={handleClose}>Search Users</MenuItem>
            </Menu>
            <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
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
