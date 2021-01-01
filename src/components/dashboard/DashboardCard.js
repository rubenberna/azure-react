import React, { useContext } from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isBase64encoded} from '../../utils/_general.util';
import { useProtectedNavigation } from '../../utils/useUserHasPermission.util';
import { Context as AuthContext } from '../../context/AuthContext';

export const DashboardCard = ({dasboard}) => {
  const {state: {role}} = useContext(AuthContext);
  const {navigateSafely} = useProtectedNavigation();

  const cardHeader = (dasboardContent) => (
    <div className="dashboard-card">
      <span>{dasboardContent.title}</span>
      <img
        alt={dasboardContent.title}
        src={isBase64encoded(dasboardContent.icon) ? `data:image/jpeg;base64,${dasboardContent.icon}` : dasboardContent.icon }/>
    </div>
  )

  return (
    <Card
      link
      header={cardHeader(dasboard)}
      meta={dasboard.requiredPermissions.join(', ')}
      description={dasboard.description}
      onClick={() => navigateSafely(dasboard.requiredPermissions, role, dasboard.slug)}
    />
  );
};

DashboardCard.propTypes = {
  dasboard: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    requiredPermissions: PropTypes.array,
    icon: PropTypes.string,
    slug: PropTypes.string
  })
};

