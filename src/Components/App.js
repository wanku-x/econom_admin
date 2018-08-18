import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { message } from 'antd';
import { LoginPage, AdminPage, NotFound } from './Pages';
import { requestGET } from './Requests';
import { AuthProvider } from './AuthProvider';
import { Loader } from './Loader';

class App extends Component {
  state = {
    checkAuth: false,
    isLoggedIn: (window.localStorage.getItem('username') ? true : false),
  };

  componentDidMount = () => {
    requestGET('/api/v1/is_logged_in/').then((result)=>{
      if (result.username) {
        window.localStorage.setItem('username', result.username);
        this.setState({
          checkAuth: true,
          isLoggedIn: true
        });
      } else {
        window.localStorage.setItem('username', null);
        this.setState({
          checkAuth: true,
          isLoggedIn: false
        });
      }
    }).catch((err)=>{
      console.log(err);
      message.error('Ошибка соединения с сервером. Повторите позже');
    });
  }

  setLoggedIn = (isLoggedIn) => {
    this.setState({ isLoggedIn });
  }

  render() {
    return this.state.checkAuth ? (
      <Router>
        <AuthProvider value={this.state.isLoggedIn}>
          <Switch>
            <Route exact path="/" render={() => <LoginPage setLoggedIn={this.setLoggedIn}/>} />
            <Route path="/admin" render={() => <AdminPage/>} />
            <Route component={NotFound} />
          </Switch>
        </AuthProvider>
      </Router>
    ):(
      <Loader isOpen={true} />
    );
  }
}

export default App;