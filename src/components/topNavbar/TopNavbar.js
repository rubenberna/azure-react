import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Context as AuthContext } from '../../context/AuthContext';

export const TopNavbar = () => {
  const {state: {username, isAuthenticated}, signOut, signIn} = useContext(AuthContext);

  return (
    <div className="top-navbar">
      {
        isAuthenticated ?
          <Dropdown className="h-font-weight-bold" text={username}>
            <Dropdown.Menu>
              <Dropdown.Item icon='sign-out' text='Sign out' onClick={signOut}/>
            </Dropdown.Menu>
          </Dropdown>
          :
          <span className="h-font-weight-bold" onClick={signIn}>Sign in</span>
      }
    </div>
  );
};