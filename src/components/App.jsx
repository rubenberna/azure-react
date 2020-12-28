import React, { useContext, useEffect, lazy, Suspense } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { useUserHasPermission } from '../utils/useUserHasPermission.util';
import { PERMISSIONS } from '../consts/permissions.consts';

const GHubProfile = lazy(() => import('@data-portal/app-one'))
const Counter = lazy(() => import('@data-portal/app-two'))

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