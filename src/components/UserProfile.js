import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Avatar, Card, CardContent } from '@mui/material';
import { firestore } from '../firebase';

function UserProfile() {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDoc = await firestore.collection('users').doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setUserProfile(userData);
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user profile: ', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  return (
    <Container>
      {userProfile && (
        <Card>
          <CardContent>
            <Avatar alt={userProfile.username} src={userProfile.profilePicture} />
            <Typography variant="h5">{userProfile.username}</Typography>
            <Typography variant="body1">{userProfile.bio}</Typography>
            {/* Display other user information here */}
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default UserProfile;
