import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCartPlus, faUserPlus, faUniversity, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { StationPage, AddStation, AddGroup, DepositPage, CreditPage } from './Pages';

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
    icon: <FontAwesomeIcon icon={faUserPlus} size={'1x'} className="anticon" />,
    name: 'Добавить команду',
    component: () => <AddGroup />
  },
  {
    path: '/admin/deposit/',
    exact: true,
    icon: <FontAwesomeIcon icon={faUniversity} size={'1x'} className="anticon" />,
    name: 'Депозит',
    component: () => <DepositPage />
  },
  {
    path: '/admin/credit/',
    exact: true,
    icon: <FontAwesomeIcon icon={faHandHoldingUsd} size={'1x'} className="anticon" />,
    name: 'Кредит',
    component: () => <CreditPage />
  },
];

export default pages;