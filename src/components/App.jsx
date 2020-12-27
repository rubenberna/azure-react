import React, { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { useUserHasPermission } from '../utils/useUserHasPermission.util';
import { PERMISSIONS } from '../consts/permissions.consts';

export const App = () => {
  const {signIn} = useContext(AuthContext);

  useEffect(() => {
    signIn();
  }, []);

  console.log(useUserHasPermission(PERMISSIONS.GUEST));

  return (
    <div>
      Home
    </div>
  );
};