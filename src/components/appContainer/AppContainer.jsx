import React from 'react';
import { Provider as AuthProvider } from '../../context/auth/AuthContext';
import { Provider as NotificationsProvider } from '../../context/notifications/NotificationsContext';

export const AppContainer = ({children}) => {
  return (
    <NotificationsProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </NotificationsProvider>
  );
};
