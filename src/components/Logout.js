// src/components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = async () => {
      try {
        await auth.signOut();
        navigate('/'); // Redirect to the home page after signing out
      } catch (error) {
        console.error('Error signing out: ', error);
      }
    };

    signOut();
  }, [navigate]);

  return null;
}

export default Logout;
