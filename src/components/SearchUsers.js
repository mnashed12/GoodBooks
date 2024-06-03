import React, { useState, useEffect, useCallback } from 'react';
import { firestore } from '../firebase';
import { TextField, List, ListItem, Container, Typography, Card, CardContent, Avatar } from '@mui/material';

function SearchUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    if (searchQuery.trim() === '') {
      setUsers([]);
      setError(null);
      return;
    }

    const usersRef = firestore.collection('users');
    const queryByEmail = usersRef.where('email', '==', searchQuery).get();
    const queryByUsername = usersRef.where('username', '==', searchQuery).get();

    try {
      console.log("Fetching users...");
      const [emailSnapshot, usernameSnapshot] = await Promise.all([
        queryByEmail,
        queryByUsername
      ]);

      console.log("Email snapshot:", emailSnapshot);
      console.log("Username snapshot:", usernameSnapshot);

      const allUsers = [
        ...emailSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        ...usernameSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      ];

      console.log("All users:", allUsers);

      const uniqueUsers = Array.from(new Set(allUsers.map(a => a.id)))
        .map(id => allUsers.find(a => a.id === id));

      console.log("Unique users:", uniqueUsers);

      setUsers(uniqueUsers);
      setError(uniqueUsers.length ? null : 'User not found');
    } catch (error) {
      console.error('Error fetching users: ', error);
      setUsers([]);
      setError('Error fetching users');
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchUsers();
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Search Users</Typography>
      <TextField
        label="Search by Email or Username"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
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
