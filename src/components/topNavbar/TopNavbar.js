import React, { useContext } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Context as AuthContext } from '../../context/AuthContext';
import { PERMISSIONS } from '../../consts/permissions.consts';

export const TopNavbar = () => {
  const {state: {username, isAuthenticated, role}, signOut, signIn} = useContext(AuthContext);

  return (
    <div className="top-navbar">
      {
        isAuthenticated ?
          <Dropdown text={<span className="h-font-weight-bold">{username}</span>}>
            <Dropdown.Menu>
              { role === PERMISSIONS.SUPER_ADMIN && <Dropdown.Item icon='cog' text='Admin'/>}
              <Dropdown.Divider />
              <Dropdown.Item icon='sign-out' text='Sign out' onClick={signOut}/>
            </Dropdown.Menu>
          </Dropdown>
          :
          <span className="h-font-weight-bold" onClick={signIn}>Sign in</span>
      }
    </div>

  );
};