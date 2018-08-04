import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu } from 'antd';
import pages from '../PagesList';

class CustomMenu extends Component {
  render() {
    return (
      <Menu
        defaultSelectedKeys={[this.props.location.pathname]}
        mode="inline"
        theme="dark"
        style={{ minHeight: '100vh' }}
      >
        {pages.filter((menuItem) => {
          if (this.props.routes.indexOf(menuItem.path) >= 0) {
            return true;
          }
          return false;
        }).map((route) => (
          <Menu.Item key={route.path}>
            <Link to={route.path}>{route.icon}<span>{route.name}</span></Link>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}

export default withRouter(CustomMenu);