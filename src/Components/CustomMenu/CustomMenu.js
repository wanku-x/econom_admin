import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
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
            <Link to={link.path}>{link.icon}<span style={{paddingLeft: 8}}>{link.name}</span></Link>
          </Menu.Item>
        ))}
      </Menu>
    );
  }
}

export default withRouter(CustomMenu);