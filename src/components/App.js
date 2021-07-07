
import React from "react"; 
//import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import "../index.css";
import Home from "../pages/Home";
import {Router, Route, Switch} from 'react-router-dom'
import EditUser from '../containers/editUser'
import Signin from "../pages/Signin"
import Signup from '../pages/Signup'
import Order from '../pages/Order'
import User from '../containers/User'
import Checkout from '../pages/Checkout'
import PrivateRoute from './PrivateRoute'
import Dashboard from './Dashboard'
import Menu from '../pages/Menu'
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import { Component } from "react";
import store from '../redux/store'
import Header from '../containers/Header'
import history from '../history'

//const store = makeStore();
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  console.log("token founded")
  // Set auth token header auth
  //const token = localStorage.jwtToken;
  //setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //console.log('decoded ', decoded)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  console.log(decoded.exp)
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component{
  

  render() {
    return(
        <Router history={history}>
          <Header/>

          <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/menu" component={Menu}/>
          <Route path="/order" component={Order}/>
          <Route path="/user" component={User}/>
          <Route path="/edit" component={EditUser}/>
          <Route path="/checkout" component={Checkout}></Route>
          </Switch>
        </Router>
    );
  }
}
export default App;