import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

class CustomMenu extends Component {
  handleClick = (e) => {
    console.log('click ', e);
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        style={{ minHeight: '100vh' }}
      >
        <Menu.Item key="1">
          <span><Icon type="mail" /><span>Navigation 1</span></span>
        </Menu.Item>
        <Menu.Item key="2">
          <span><Icon type="mail" /><span>Navigation 2</span></span>
        </Menu.Item>
        <Menu.Item key="3">
          <span><Icon type="mail" /><span>Navigation 3</span></span>
        </Menu.Item>
        <Menu.Item key="4">
          <span><Icon type="mail" /><span>Navigation 4</span></span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default CustomMenu;