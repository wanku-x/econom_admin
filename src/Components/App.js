import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import { CustomMenu } from './CustomMenu';
import { NotFound } from './Pages';
import pages from './PagesList';
import './App.css';

const { Sider, Content, Header } = Layout;

class App extends Component {
  state = {
    collapsed: false,
    routes: [
      '/station',
      '/not_station',
      '/not_station_2'
    ]
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
      <Router>
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
            <CustomMenu routes={this.state.routes} />
          </Sider>
          <Header className="header">
            <Icon
              className="trigger"
              onClick={this.toggleSider}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            />
          </Header>
          <Content className="content">
            {pages.filter((page) => {
              if (this.state.routes.indexOf(page.path) >= 0) {
                return true;
              }
              return false;
            }).map((page, index) => (
              <Route
                key={index}
                path={page.path}
                exact={page.exact}
                component={page.component}
              />
            ))}
            <Route component={() => <NotFound />}/>
          </Content>
        </Layout>
      </Router>
    );
  }
}

export default App;