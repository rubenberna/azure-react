import React, { useContext } from 'react';
import { Button } from 'semantic-ui-react'
import { Context as AuthContext } from '../../context/auth/AuthContext';
import { useGetDashboards } from '../../utils/dashboard/useGetDashboards';
import { DashboardCard } from './DashboardCard';

export const Dashboard = () => {
  const {changeName} = useContext(AuthContext);
  const {dashBoardsList} = useGetDashboards();

  return (
    <div className="h-main-segment">
      <div className="h-flex-column">
        <div>
          <h3>Main dashboard</h3>
          <Button content='Change name' primary onClick={changeName}/>
        </div>
        <div className="dashboard">
          {dashBoardsList.map(dashboard => <DashboardCard key={dashboard.slug} dasboard={dashboard}/>)}
        </div>
      </div>
    </div>
  );
};