import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { StationPage, NotStationPage } from './Pages';

const pages = [
  {
    path: '/admin/station/',
    exact: true,
    icon: <FontAwesomeIcon icon={faShoppingCart} size={'1x'} className="anticon" />,
    name: 'Станция',
    component: () => <StationPage />
  },
  {
    path: '/admin/not_station/',
    exact: true,
    icon: <FontAwesomeIcon icon={faShoppingCart} size={'1x'} className="anticon" />,
    name: 'Добавить команду',
    component: () => <NotStationPage />
  },
  {
    path: '/admin/not_station_2/',
    exact: true,
    icon: <FontAwesomeIcon icon={faShoppingCart} size={'1x'} className="anticon" />,
    name: 'Депозит',
    component: () => <StationPage />
  },
];

export default pages;