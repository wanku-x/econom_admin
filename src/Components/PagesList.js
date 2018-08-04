import React from 'react';
import { Icon } from 'antd';
import { StationPage, NotStationPage } from './Pages';

const pages = [
  {
    path: '/station',
    exact: true,
    icon: <Icon type="mail" />,
    name: 'Станции',
    component: () => <StationPage />
  },
  {
    path: '/not_station',
    exact: true,
    icon: <Icon type="mail" />,
    name: 'Не станции',
    component: () => <NotStationPage />
  },
  {
    path: '/not_station_2',
    exact: true,
    icon: <Icon type="mail" />,
    name: 'Не станции 2',
    component: () => <StationPage />
  },
];

export default pages;