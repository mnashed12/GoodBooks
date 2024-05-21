import React, { useState, useEffect, useCallback } from 'react';
import { firestore } from '../firebase';
import { TextField, Button, List, ListItem, Container, Typography, Card, CardContent, Avatar } from '@mui/material';

function SearchUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    if (searchQuery.trim() === '') {
      setUsers([]);
      return;
    }
  
    const usersRef = firestore.collection('users');
    const queryByEmail = usersRef.where('email', '==', searchQuery).get();
    const queryByUsername = usersRef.where('username', '==', searchQuery).get();
    const queryByUserId = usersRef.where('userId', '==', searchQuery).get();
  
    try {
      console.log("Fetching users...");
      const [emailSnapshot, usernameSnapshot, userIdSnapshot] = await Promise.all([
        queryByEmail,
        queryByUsername,
        queryByUserId,
      ]);
  
      console.log("Email snapshot:", emailSnapshot);
      console.log("Username snapshot:", usernameSnapshot);
      console.log("User ID snapshot:", userIdSnapshot);
  
      const allUsers = [
        ...emailSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        ...usernameSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        ...userIdSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
      ];
  
      console.log("All users:", allUsers);
  
      // Remove duplicates
      const uniqueUsers = Array.from(new Set(allUsers.map(a => a.id)))
        .map(id => allUsers.find(a => a.id === id));
  
      console.log("Unique users:", uniqueUsers);
  
      setUsers(uniqueUsers);
      setError(null); // Clear error if users found
    } catch (error) {
      console.error('Error fetching users: ', error);
      setUsers([]);
      setError('User not found');
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = () => {
    fetchUsers();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchUsers();
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Search Users</Typography>
      <TextField
        label="Search by Email, Username, or UserId"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginTop: '10px' }}>
        Search
      </Button>
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <Card>
              <CardContent>
                <Avatar alt={user.username} src={user.profilePicture} />
                <Typography variant="h5">{user.username}</Typography>
                <Typography variant="body1">{user.email}</Typography>
                <Typography variant="body1">{user.bio}</Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default SearchUsers;
