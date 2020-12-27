import { useContext, useState, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { PERMISSIONS } from '../consts/permissions.consts';

export const useUserHasPermission = (permissionToCheck) => {
  const {state: {role}} = useContext(AuthContext);
  const [hasPermission, setHasPermission] = useState(false);

  const permissionsArray = Object.values(PERMISSIONS);

  useEffect(() => {
    if (role) {
      const userRoleIndex = permissionsArray.indexOf(role);
      const permissionToCheckIndex = permissionsArray.indexOf(permissionToCheck);
      setHasPermission(userRoleIndex <= permissionToCheckIndex)
    }
  }, [role])

  return hasPermission;
};