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
      requestGET('/api/v1/logout/').then((result)=>{
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
        <Menu.Item key="/logout" onClick={this.logout}>
          <FontAwesomeIcon icon={faSignOutAlt} size={'1x'} className="anticon"/>Выйти
        </Menu.Item>
        <Loader isOpen={this.state.loading} />
      </Menu>
    );
  }
}

export default withRouter(CustomMenu);