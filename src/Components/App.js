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
    isLoggedIn: false,
  };

  componentDidMount = () => {
    this.setState({ checkAuth: true, isLoggedIn: true });
    /*requestGET('/api/v1/is_logged_in/').then((result)=>{
      if (result.is_logged_in) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState( {isLoggedIn: false });
      }
    }).catch((err)=>{
      console.log(err);
      message.error('Ошибка соединения с сервером. Повторите позже');
    }).finally(()=>{
      this.setState({ checkAuth: true });
    });*/
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
            <Route path="/admin" render={() => <AdminPage setLoggedIn={this.setLoggedIn}/>} />
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