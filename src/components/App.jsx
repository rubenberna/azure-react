import React, { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

export const App = () => {
  const {signIn} = useContext(AuthContext);

  useEffect(() => {
    signIn();
  }, []);

  return (
    <div>
      Home
    </div>
  );
};