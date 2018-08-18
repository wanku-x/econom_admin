import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Menu } from 'antd';
import pages from '../PagesList';

class CustomMenu extends Component {
  render() {
    const { routes } = this.props;
    const { pathname } = this.props.location;

    return (
      <Menu
        defaultSelectedKeys={[pathname]}
        mode="inline"
        theme="dark"
        style={{ minHeight: '100vh' }}
      >
        {pages.filter((page) => {
          if (routes.indexOf(page.path) >= 0) {
            return true;
          }
          return false;
        }).map((link) => (
          <Menu.Item key={link.path}>
            <Link to={link.path}>{link.icon}{link.name}</Link>
          </Menu.Item>
        ))}
        <Menu.Item key="/logout">
          <FontAwesomeIcon icon={faSignOutAlt} size={'1x'} className="anticon"/>Выйти
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(CustomMenu);