import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Menu, Sidebar } from 'semantic-ui-react';
import { useGetDashboards } from '../../utils/useGetDashboards';
import { Context as NotificationsContext } from '../../context/NotificationsContext';
import { userHasPermission } from '../../utils/useUserHasPermission.util';
import VolvoIcon from '../../assets/icons/assets-logo-icon.png';
import { Context as AuthContext } from '../../context/AuthContext';
import { PERMISSIONS } from '../../consts/permissions.consts';
import { isBase64encoded } from '../../utils/_general.util';
import { DEFAULT_NOTIFICATIONS } from '../../consts/notifications.consts';


const defaultHome = {
  title: 'Volvo',
  slug: '/',
  icon: VolvoIcon,
  requiredPermissions: [PERMISSIONS.GUEST]
};

export const SideNavbar = () => {
  const {state: {role}} = useContext(AuthContext);
  const history = useHistory();
  const {dashBoardsList} = useGetDashboards();
  const [visibleSegment, setVisibleSegment] = useState(defaultHome.slug);
  const {setNotification} = useContext(NotificationsContext);

  const navigate = (requiredPermission, link) => {
    setVisibleSegment(link);
    if (requiredPermission && role) {
      if (userHasPermission(requiredPermission, role)) {
        history.push(link)
      } else {
        setNotification(DEFAULT_NOTIFICATIONS.notAllowed)
      }
    }
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
          <img className="side-navbar-item-logo" src={isBase64encoded(dashboard.icon) ? `data:image/jpeg;base64,${dashboard.icon}` : dashboard.icon} alt={dashboard.title}/>
          <span>{dashboard.title}</span>
        </Menu.Item>
      ))}
    </Sidebar>
  );
};

