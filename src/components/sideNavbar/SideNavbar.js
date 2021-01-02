import React, { useContext, useState } from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';
import { useGetDashboards } from '../../utils/dashboard/useGetDashboards';
import { useProtectedNavigation } from '../../utils/permissions/useUserHasPermission.util';
import VolvoIcon from '../../assets/icons/assets-logo-icon.png';
import { Context as AuthContext } from '../../context/auth/AuthContext';
import { PERMISSIONS } from '../../consts/permissions/permissions.consts';
import { isBase64encoded } from '../../utils/general/_general.util';


const defaultHome = {
  title: 'Volvo',
  slug: '/',
  icon: VolvoIcon,
  requiredPermissions: [PERMISSIONS.GUEST]
};

export const SideNavbar = () => {
  const {state: {role}} = useContext(AuthContext);
  const {dashBoardsList} = useGetDashboards();
  const [visibleSegment, setVisibleSegment] = useState(defaultHome.slug);
  const {navigateSafely} = useProtectedNavigation();

  const navigate = (requiredPermission, link) => {
    setVisibleSegment(link);
    navigateSafely(requiredPermission, role, link);
  };

  return (
    <Sidebar
      as={Menu}
      animation='overlay'
      direction='left'
      icon='labeled'
      inverted
      vertical
      visible={true}
      width='thin'>
      {[defaultHome, ...dashBoardsList].map((dashboard) => (
        <Menu.Item
          key={dashboard.slug}
          className="side-navbar-item"
          as='a'
          active={visibleSegment === dashboard.slug}
          onClick={() => navigate(dashboard.requiredPermissions, dashboard.slug)}>
          <img className="side-navbar-item-logo"
               src={isBase64encoded(dashboard.icon) ? `data:image/jpeg;base64,${dashboard.icon}` : dashboard.icon}
               alt={dashboard.title}/>
          <span>{dashboard.title}</span>
        </Menu.Item>
      ))}
    </Sidebar>
  );
};

