import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Divider, Menu } from 'semantic-ui-react';
import { useGetDashboards } from '../../utils/useGetDashboards';
import { Context as NotificationsContext } from '../../context/NotificationsContext';
import { userHasPermission } from '../../utils/useUserHasPermission.util';
import VolvoIcon from '../../assets/icons/assets-logo-icon.png';
import { Context as AuthContext } from '../../context/AuthContext';
import { PERMISSIONS } from '../../consts/permissions.consts';


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
    setVisibleSegment(link)
    if (requiredPermission && role) {
      userHasPermission(requiredPermission[0], role) && history.push(link);
    }
  };

  return (
    <div className="side-navbar">
      {[defaultHome, ...dashBoardsList].map(dashboard => (
        <>
          <Menu.Item
            className="side-navbar-item"
            as='a'
            key={dashboard.slug}
            active={visibleSegment === dashboard.slug }
            onClick={() => navigate(dashboard.requiredPermissions, dashboard.slug)}>
            <img className="side-navbar-item-logo" src={dashboard.icon} alt={dashboard.title}/>
            <span className="side-navbar-item-title">{dashboard.title}</span>
          </Menu.Item>
          <Divider/>
        </>
      ))}
    </div>
  );
};


// <Grid columns={1}>
//   <Grid.Column>
//     <Sidebar.Pushable as={Segment} style={{minHeight: '100vh'}}>
//       <Sidebar
//         as={Menu}
//         animation='overlay'
//         direction='left'
//         icon='labeled'
//         inverted
//         vertical
//         visible={true}
//         width='thin'
//       >
//         <Menu.Item className="side-navbar-item" as='a'
//                    onClick={() => setVisibleSegment(Segments.HOME)}
//                    active={visibleSegment === Segments.HOME}>
//           <img className="side-navbar-item-logo" src={BLUE_LOGO} alt="volvo"/>
//           <span className="side-navbar-item-title">Volvo</span>
//         </Menu.Item>
//         <Menu.Item as='a' onClick={() => setVisibleSegment(Segments.APP_ONE)}
//                    active={visibleSegment === Segments.APP_ONE}>
//           <Icon name='font'/>
//           Npm package
//         </Menu.Item>
//         <Menu.Item as='a' onClick={() => setVisibleSegment(Segments.APP_TWO)}
//                    active={visibleSegment === Segments.APP_TWO}>
//           <Icon name='bold'/>
//           Npm package
//         </Menu.Item>
//       </Sidebar>
//       <Sidebar.Pusher>
//         <Suspense fallback={<div>Loading...</div>}>
//           <div className="h-main-segment">
//             {renderSegments(visibleSegment)}
//           </div>
//         </Suspense>
//       </Sidebar.Pusher>
//     </Sidebar.Pushable>
//   </Grid.Column>
// </Grid>