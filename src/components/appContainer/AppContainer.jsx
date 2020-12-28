import React from 'react';
import { Provider as AuthProvider } from '../../context/AuthContext';
import { Provider as NotificationsProvider } from '../../context/NotificationsContext';
import { SideNavbar } from '../sideNavbar/SideNavbar';
import { TopNavbar } from '../topNavbar/TopNavbar';

export const AppContainer = ({children}) => {
  return (
    <NotificationsProvider>
      <AuthProvider>
        <TopNavbar/>
        <SideNavbar/>
        {children}
      </AuthProvider>
    </NotificationsProvider>
  );
};
