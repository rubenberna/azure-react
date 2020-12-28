import React, { lazy, Suspense, useState } from 'react';
import { Grid, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';
import { Dashboards } from '../dashboards/Dashboards';
import BLUE_LOGO from '../../assets/icons/assets-logo-icon.png';

const GHubProfile = lazy(() => import('@data-portal/app-one'));
const Counter = lazy(() => import('@data-portal/app-two'));

const Segments = {
  HOME: 'HOME',
  APP_ONE: 'APP_0',
  APP_TWO: 'APP_1',
};

export const SideNavbar = () => {
  const [visibleSegment, setVisibleSegment] = useState(Segments.HOME);

  const renderSegments = (name) => ({
    [Segments.HOME]: <Dashboards/>,
    [Segments.APP_ONE]: <GHubProfile/>,
    [Segments.APP_TWO]: <Counter/>
  })[name];

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Sidebar.Pushable as={Segment} style={{minHeight: '100vh'}}>
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='left'
            icon='labeled'
            inverted
            vertical
            visible={true}
            width='thin'
          >
            <Menu.Item className="side-navbar-item" style={{ display: 'flex !important'}} as='a' onClick={() => setVisibleSegment(Segments.HOME)}
                       active={visibleSegment === Segments.HOME}>
              <img className="side-navbar-item-logo" src={BLUE_LOGO} alt="volvo"/>
              <span className="side-navbar-item-title">Volvo</span>
            </Menu.Item>
            <Menu.Item as='a' onClick={() => setVisibleSegment(Segments.APP_ONE)}
                       active={visibleSegment === Segments.APP_ONE}>
              <Icon name='font'/>
              Npm package
            </Menu.Item>
            <Menu.Item as='a' onClick={() => setVisibleSegment(Segments.APP_TWO)}
                       active={visibleSegment === Segments.APP_TWO}>
              <Icon name='bold'/>
              Npm package
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Suspense fallback={<div>Loading...</div>}>
              {renderSegments(visibleSegment)}
            </Suspense>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  );
};
