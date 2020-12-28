import React from 'react';
import { Provider as AuthProvider } from '../../context/AuthContext';
import { Provider as NotificationsProvider } from '../../context/NotificationsContext';
import { SideNavbar } from '../sideNavbar/SideNavBar';

export const AppContainer = ({children}) => {
  return (
    <NotificationsProvider>
      <AuthProvider>
        <SideNavbar/>
        {children}
      </AuthProvider>
    </NotificationsProvider>
  );
};
