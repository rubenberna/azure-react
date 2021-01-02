import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { PERMISSIONS } from '../../consts/permissions/permissions.consts';
import { Context as NotificationsContext } from '../../context/notifications/NotificationsContext';
import { DEFAULT_NOTIFICATIONS } from '../../consts/notifications/notifications.consts';

export const userHasPermission = (permissionToCheck, role) => {
  const permissionsArray = Object.values(PERMISSIONS);
  const sortedPermissionsToCheck = permissionToCheck?.sort((a, b) => permissionsArray.indexOf(a) - permissionsArray.indexOf(b));
  const bottomPermission = sortedPermissionsToCheck[sortedPermissionsToCheck.length - 1];
  const userRoleIndex = permissionsArray.indexOf(role);
  const permissionToCheckIndex = permissionsArray.indexOf(bottomPermission.toUpperCase());

  if (userRoleIndex < 0) return false
  if (permissionToCheck.includes(role)) return true
  return userRoleIndex <= permissionToCheckIndex;
};

export const useProtectedNavigation = () => {
  const history = useHistory();
  const {setNotification} = useContext(NotificationsContext);

  const navigateSafely = (requiredPermission, role, link) => {
    if (requiredPermission && role) {
      if (userHasPermission(requiredPermission, role)) {
        history.push(link)
      } else {
        setNotification(DEFAULT_NOTIFICATIONS.notAllowed)
      }
    }
  }

  return { navigateSafely }
}

export const usePrivateRoute = (permissionToCheck, role) => {
  const {setNotification} = useContext(NotificationsContext);
  const history = useHistory();

  useEffect(() => {
    if (!role) {
      setNotification(DEFAULT_NOTIFICATIONS.notAllowed)
      history.push('/');
    }
    if (role && permissionToCheck) {
      if (!userHasPermission(permissionToCheck, role)) {
        history.push('/');
        setNotification(DEFAULT_NOTIFICATIONS.notAllowed)
      }
    }
  }, [permissionToCheck, role]);
};
