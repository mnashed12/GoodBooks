import React, { useState } from 'react';
import { auth, firestore } from '../firebase';
import { TextField, Button, Container, Typography } from '@mui/material';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);

      await addUserToFirestore(userCredential.user.uid, { email, username });
    } catch (error) {
      console.error(error);
    }
  };

  const addUserToFirestore = async (userId, userData) => {
    try {
      await firestore.collection('users').doc(userId).set(userData);
      console.log('User added to Firestore successfully');
    } catch (error) {
      console.error('Error adding user to Firestore: ', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Sign Up</Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Username"
        type="text"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>
    </Container>
  );
}

export default SignUp;
