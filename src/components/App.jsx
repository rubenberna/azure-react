import React, { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

export const App = () => {
  const {signIn, getProfile, signOut } = useContext(AuthContext);

  useEffect(() => {
    signIn();
  }, []);

  useEffect(() => {
    ;(async () => {
      await signIn()
      await Promise.all([
        getProfile()
      ])
    })()
  }, []);

  return (
    <div>
      Home
    </div>
  );
};