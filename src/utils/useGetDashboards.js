import React, { lazy, useContext } from 'react';
import { metadata as appOneMetadata } from '@data-portal/app-one';
import { metadata as appTwoMetadata } from '@data-portal/app-two';
import { convertToKebabCase } from './_general.util';
import { Context as AuthContext } from '../context/AuthContext';

const GHubProfile = lazy(() => import('@data-portal/app-one'));
const Counter = lazy(() => import('@data-portal/app-two'));

export const useGetDashboards = () => {
  const {state} = useContext(AuthContext);

  const dashBoardsList = [
    {
      title: appOneMetadata.title,
      description: appOneMetadata.description,
      slug: convertToKebabCase(appOneMetadata.title),
      requiredPermissions: appOneMetadata.requiredPermissions,
      icon: appOneMetadata.icon,
      component: <GHubProfile title="GitHub finder" state={state}/>
    }, {
      title: appTwoMetadata.title,
      description: appTwoMetadata.description,
      slug: `/${convertToKebabCase(appTwoMetadata.title)}`,
      requiredPermissions: appTwoMetadata.requiredPermissions,
      icon: appTwoMetadata.icon,
      component: <Counter state={state}/>
    },
  ];

  return {dashBoardsList};
};