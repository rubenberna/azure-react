import React, { Suspense, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Context as AuthContext } from '../context/AuthContext';
import { Dashboard } from './dashboard/Dashboard';
import { GenericTemplate } from './genericTemplate';
import { useGetDashboards } from '../utils/useGetDashboards';
import { TopNavbar } from './topNavbar/TopNavbar';
import { SideNavbar } from './sideNavbar/SideNavbar';
import history from '../config/history';


export const App = () => {
  const {signIn} = useContext(AuthContext);
  const {dashBoardsList} = useGetDashboards();

  useEffect(() => {
    signIn();
  }, []);

  return (
    <BrowserRouter history={history}>
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
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};