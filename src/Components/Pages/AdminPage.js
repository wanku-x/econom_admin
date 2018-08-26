import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout, Icon, message } from 'antd';
import { CustomMenu } from '../CustomMenu';
import { NotFound } from './index';
import { withAuthLeave } from '../AuthProvider';
import { Loader } from '../Loader';
import { requestGET } from '../Requests';
import pages from '../PagesList';
import './AdminPage.css';

const { Sider, Content, Header } = Layout;

class AdminPage extends Component {
  state = {
    loading: false,
    collapsed: false,
    routes: []
  };

  componentDidMount = () => {
    this.setState({loading: true}, () => {
      requestGET('/api/v1/get_menu/').then((result) => {
        this.setState({
          routes: result.user_allowed_urls,
        });
      }).catch((err)=>{
        console.log(err);
        message.error('Ошибка соединения с сервером. Повторите позже');
      }).finally(()=>{
        this.setState({loading: false});
      });
    });
  }

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
          {this.state.loading ? (null):(
            <CustomMenu routes={this.state.routes} setLoggedIn={this.props.setLoggedIn}/>
          )}
        </Sider>
        <Header className="header">
          <Icon
            className="trigger"
            onClick={this.toggleSider}
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
          />
        </Header>
        <Content className="content">
          {this.state.loading ? (null):(
            <Switch>
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
              <Route key="1" path={pages[1].path} exact component={pages[1].component} />
              <Route key="2" path={pages[2].path} exact component={pages[2].component} />
              <Route key="3" path={pages[3].path} exact component={pages[3].component} />
              <Route key="4" path={pages[4].path} exact component={pages[4].component} />
              <Route key="5" path={pages[5].path} exact component={pages[5].component} />
              <Route key="6" path={pages[6].path} exact component={pages[6].component} />
              <Route exact path="/admin" render={() => <Redirect to={this.state.routes[0]} />} />
              <Route component={NotFound} />
            </Switch>
          )}
          <Loader isOpen={this.state.loading} />
        </Content>
      </Layout>
    );
  }
}

export default withAuthLeave(AdminPage);