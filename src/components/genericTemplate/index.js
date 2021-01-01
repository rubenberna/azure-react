import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context as AuthContext } from '../../context/AuthContext';
import { usePrivateRoute } from '../../utils/useUserHasPermission.util';

export const GenericTemplate = ({children, dashboard}) => {
  const {state: {role}} = useContext(AuthContext);
  usePrivateRoute(dashboard.requiredPermissions, role);

  return (
    <div className="h-main-segment">
      {children}
    </div>
  );
};

GenericTemplate.propTypes = {
  dasboard: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    requiredPermissions: PropTypes.array,
    icon: PropTypes.string,
  })
};