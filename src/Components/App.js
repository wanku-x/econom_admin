import React, { Component } from 'react';
import { Layout, Button, Icon } from 'antd';
import { CustomMenu } from './CustomMenu';
import { StationPage, NotStationPage } from './Pages';
import './App.css';

const { Sider, Content, Header } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };

  toggleSider = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  closeSider = () => {
    this.setState({
      collapsed: true,
    });
  }

  openSider = () => {
    this.setState({
      collapsed: false,
    });
  }

  render() {
    return (
      <Layout className="wrapper">
        <Sider
          breakpoint="md"
          className="sider"
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          collapsedWidth={0}
          onCollapse={this.closeSider}
          onBreakpoint={this.openSider}
        >
          <CustomMenu />
        </Sider>
        <Header className="header">
          <Button
            onClick={this.toggleSider}
          >
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            />
          </Button>
        </Header>
        <Content className="content">
          <StationPage />
        </Content>
      </Layout>
    );
  }
}

export default App;