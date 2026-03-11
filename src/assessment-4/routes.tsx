import React from 'react';
import type { RouteProps } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Datagrid } from './pages/Datagrid';
import { Home } from './pages/Home';
import { Stock1 } from './pages/Stock1';
import { Stock2 } from './pages/Stock2';

export type Assessment4Route = {
  index?: boolean;
  path?: RouteProps['path'];
  element: React.ReactElement;
};

export const assessment4Routes: Assessment4Route[] = [
  { index: true, element: <Home /> },
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'stock1', element: <Stock1 /> },
  { path: 'stock2', element: <Stock2 /> },
  { path: 'datagrid', element: <Datagrid /> },
];
