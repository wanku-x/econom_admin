import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { StationPage, AddStation, AddGroup } from './Pages';

const pages = [
  {
    path: '/admin/station/',
    exact: true,
    icon: <FontAwesomeIcon icon={faShoppingCart} size={'1x'} className="anticon" />,
    name: 'Станция',
    component: () => <StationPage />
  },
  {
    path: '/admin/add_station/',
    exact: true,
    icon: <FontAwesomeIcon icon={faCartPlus} size={'1x'} className="anticon" />,
    name: 'Добавить станцию',
    component: () => <AddStation />
  },
  {
    path: '/admin/add_group/',
    exact: true,
    icon: <FontAwesomeIcon icon={faShoppingCart} size={'1x'} className="anticon" />,
    name: 'Добавить команду',
    component: () => <AddGroup />
  },
];

export default pages;