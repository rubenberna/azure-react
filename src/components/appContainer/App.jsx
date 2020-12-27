import React from 'react';
import { Provider as AuthProvider } from '../../context/AuthContext';
import { Provider as NotificationsProvider } from '../../context/NotificationsContext';
import { MainNav } from '../general/Navbar';

export const AppContainer = ({children}) => {

  return (
    <NotificationsProvider>
      <AuthProvider>
        <MainNav/>
        {children}
      </AuthProvider>
    </NotificationsProvider>
  );
};
