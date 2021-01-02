import React, { Suspense, useContext, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import history from '../config/history';
import { Context as AuthContext } from '../context/auth/AuthContext';
import { Context as NotificationsContext } from '../context/notifications/NotificationsContext';
import { Dashboard } from './dashboard/Dashboard';
import { GenericTemplate } from './genericTemplate';
import { useGetDashboards } from '../utils/dashboard/useGetDashboards';
import { TopNavbar } from './topNavbar/TopNavbar';
import { SideNavbar } from './sideNavbar/SideNavbar';
import { activateToast, Notifications } from './notifications/Notifications';
import 'react-toastify/dist/ReactToastify.css';


export const App = () => {
  const {signIn} = useContext(AuthContext);
  const {state: {message, visible}} = useContext(NotificationsContext);
  const {dashBoardsList} = useGetDashboards();

  useEffect(() => {
    signIn();
  }, []);

  useEffect(() => {
    if (message && visible) {
      activateToast(message);
    }
  }, [message, visible]);

  return (
    <BrowserRouter history={history}>
      <Notifications/>
      <TopNavbar/>
      <SideNavbar/>
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/" component={Dashboard}/>
          {dashBoardsList?.map(dashboard => (
            <Route
              path={dashboard.slug}
              exact
              key={dashboard.slug}
              render={() => <GenericTemplate dashboard={dashboard}>{dashboard.component}</GenericTemplate>}
            />
          ))}
        </Suspense>
        <Route path="*">
          <Redirect to="/"/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
