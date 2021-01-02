import { lazy, useContext } from 'react';
import { metadata as appOneMetadata } from '@data-portal/app-one';
import { metadata as appTwoMetadata } from '@data-portal/app-two';
import { convertToKebabCase } from '../general/_general.util';
import { Context as AuthContext } from '../../context/auth/AuthContext';

const GitHubFinder = lazy(() => import('@data-portal/app-one'));
const Counter = lazy(() => import('@data-portal/app-two'));


export const useGetDashboards = () => {
  const {state} = useContext(AuthContext);
  const listOfLibraries = [appOneMetadata, appTwoMetadata];

  const DASHBOARDS = (name) => ({
    APP_1: <GitHubFinder state={state}/>,
    APP_2: <Counter state={state}/>
  })[name]


  const dashBoardsList = listOfLibraries.map((dashboard, index) => ({
    title: dashboard.title,
    description: dashboard.description,
    icon: dashboard.icon,
    slug: `/${convertToKebabCase(dashboard.title)}`,
    requiredPermissions: dashboard.requiredPermissions,
    component: DASHBOARDS([`APP_${index + 1 }`])
  }));

  return {dashBoardsList};
};
