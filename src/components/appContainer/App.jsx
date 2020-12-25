import React from 'react';
import { Provider as AuthProvider } from '../../context/AuthContext'
import {MainNav} from '../general/Navbar';

export const AppContainer = ({ children }) => {

  return (
    <AuthProvider>
      <MainNav/>
      { children }
    </AuthProvider>
  );
};