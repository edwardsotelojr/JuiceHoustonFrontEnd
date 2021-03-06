import React from "react";
import "../css/index.css";
import Home from "../pages/Home";
import { Router, Route, Switch } from "react-router-dom";
import EditUser from "../containers/editUser";
import resetPassword from "../containers/resetPassword";
import Signin from "../pages/Signin";
import Verify from "../containers/Verify";
import Signup from "../containers/newUser";
import Order from "../containers/Order";
import User from "../containers/User";
import Checkout from "../containers/Checkout";
import OrderConfirmation from "../pages/OrderConfirmation";
import Menu from "../pages/Menu";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import { Component } from "react";
import store from "../redux/store";
import Header from "../containers/Header";
import history from "../history";

// Check for token to keep user logged in
if (localStorage.jwtToken !== undefined) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded.user));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Header />
        <div style={{ position: "relative", top: "59px" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/verify" component={Verify} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/menu" component={Menu} />
            <Route path="/order" component={Order} />
            <Route path="/user" component={User} />
            <Route path="/edit" component={EditUser} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/resetPassword" component={resetPassword} />
            <Route path="/orderConfirmation" component={OrderConfirmation} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
