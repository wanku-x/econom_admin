import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { StationPage, NotStationPage } from './Pages';

const pages = [
  {
    path: '/station',
    exact: true,
    icon: <FontAwesomeIcon icon={faShoppingCart} size={'1x'} />,
    name: 'Станция',
    component: () => <StationPage />
  },
  {
    path: '/not_station',
    exact: true,
    icon: <FontAwesomeIcon icon={faShoppingCart} size={'1x'} />,
    name: 'Добавить команду',
    component: () => <NotStationPage />
  },
  {
    path: '/not_station_2',
    exact: true,
    icon: <FontAwesomeIcon icon={faShoppingCart} size={'1x'} />,
    name: 'Депозит',
    component: () => <StationPage />
  },
];

export default pages;