import React from 'react';
import { Provider as AuthProvider } from '../../context/AuthContext';
import { Provider as NotificationsProvider } from '../../context/NotificationsContext';

export const AppContainer = ({children}) => {
  return (
    <NotificationsProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </NotificationsProvider>
  );
};
