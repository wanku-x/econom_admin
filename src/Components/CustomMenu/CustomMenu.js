import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Menu, message } from 'antd';
import { requestGET } from '../Requests';
import pages from '../PagesList';
import { Loader } from '../Loader';

class CustomMenu extends Component {
  state = {
    loading: false
  }

  logout = () => {
    this.setState({ loading: true }, () => {
      requestGET('/logout').then((result)=>{
        if (result.success) {
          this.props.setLoggedIn(false);
        }
      }).catch((err)=>{
        console.log(err);
        message.error('Ошибка соединения с сервером. Повторите позже');
      }).finally(()=>{
        this.setState({ loading: false });
      });
    });
  }

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
        <Menu.Item key={pages[1].path}>
          <Link to={pages[1].path}>{pages[1].icon}{pages[1].name}</Link>
        </Menu.Item>
        <Menu.Item key={pages[2].path}>
          <Link to={pages[2].path}>{pages[2].icon}{pages[2].name}</Link>
        </Menu.Item>
        <Menu.Item key={pages[3].path}>
          <Link to={pages[3].path}>{pages[3].icon}{pages[3].name}</Link>
        </Menu.Item>
        <Menu.Item key={pages[4].path}>
          <Link to={pages[4].path}>{pages[4].icon}{pages[4].name}</Link>
        </Menu.Item>
        <Menu.Item key={pages[5].path}>
          <Link to={pages[5].path}>{pages[5].icon}{pages[5].name}</Link>
        </Menu.Item>
        <Menu.Item key={pages[6].path}>
          <Link to={pages[6].path}>{pages[6].icon}{pages[6].name}</Link>
        </Menu.Item>
        <Menu.Item key="/logout" onClick={this.logout}>
          <FontAwesomeIcon icon={faSignOutAlt} size={'1x'} className="anticon"/>Выйти
        </Menu.Item>
        <Loader isOpen={this.state.loading} />
      </Menu>
    );
  }
}

export default withRouter(CustomMenu);