import { PERMISSIONS } from '../consts/permissions.consts';

export const userHasPermission = (permissionToCheck, role) => {

  const permissionsArray = Object.values(PERMISSIONS);

  // simple permissions check in level of hierarchy
    const userRoleIndex = permissionsArray.indexOf(role);
    const permissionToCheckIndex = permissionsArray.indexOf(permissionToCheck.toUpperCase());

    return userRoleIndex <= permissionToCheckIndex;
};