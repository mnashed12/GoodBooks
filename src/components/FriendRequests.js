// src/components/FriendRequests.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { List, ListItem, ListItemText, Button, Container } from '@mui/material';

function FriendRequests({ user }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchRequests = async () => {
        const requestsRef = firestore.collection('friends');
        const snapshot = await requestsRef.where('user2Id', '==', user.uid).where('status', '==', 'pending').get();
        const requestsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRequests(requestsData);
      };

      fetchRequests();
    }
  }, [user]);

  const handleAcceptRequest = async (requestId, user1Id) => {
    await firestore.collection('friends').doc(requestId).update({
      status: 'accepted'
    });

    const userRef = firestore.collection('users').doc(user.uid);
    const friendRef = firestore.collection('users').doc(user1Id);

    await userRef.update({
      friends: firestore.FieldValue.arrayUnion(user1Id)
    });

    await friendRef.update({
      friends: firestore.FieldValue.arrayUnion(user.uid)
    });

    setRequests(requests.filter(request => request.id !== requestId));
  };

  return (
    <Container>
      <List>
        {requests.map(request => (
          <ListItem key={request.id}>
            <ListItemText primary={request.user1Id} />
            <Button onClick={() => handleAcceptRequest(request.id, request.user1Id)}>Accept</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default FriendRequests;
