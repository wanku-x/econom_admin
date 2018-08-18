import React from 'react';
import { Redirect } from 'react-router-dom';
 
const { Provider, Consumer } = React.createContext({
  isLoggedIn: false,
});
 
export class AuthProvider extends React.Component {
  render() {
    return <Provider value={this.props.value}>{this.props.children}</Provider>
  }
}
 
export const withAuthLeave = Component => props => (
  <Consumer>
    {isLoggedIn => (isLoggedIn ? <Component {...props} /> : <Redirect to="/" />)}
  </Consumer>
)

export const withAuthEnter = Component => props => (
  <Consumer>
    {isLoggedIn => (isLoggedIn ? <Redirect to="/admin" /> : <Component {...props} />)}
  </Consumer>
)