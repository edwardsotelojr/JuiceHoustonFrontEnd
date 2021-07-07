import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    USER_EDITED
  } from "./types";
  import axios from "axios";
  import setAuthToken from "../utils/setAuthToken";
  import jwt_decode from 'jwt-decode';
  import history from "../history";


  // Register User
  export const signup = (userData, history) => dispatch => {
    axios
      .post("http://localhost:8000/users/signup", userData)
      .then(res => history.push("/login")) // re-direct to login on successful register
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
  // Login - get user token
  export const signin = userData => dispatch => {
    console.log("signin func");
    console.log(userData)
    axios
      .post("http://localhost:8000/users/signin", userData)
      .then(res => {
        console.log(res.data);
        // Save to localStorage
  // Set token to localStorage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        console.log("decoded ",decoded)
        // Set current user
        dispatch(setCurrentUser(decoded));
        history.push('/')
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err
        })
      );
  };
  // Set logged in user
  export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };
  // User loading
  export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
  };
  // Log user out
  export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    console.log('logoutUser')
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    history.push('/')
  };

  export const userEdited = () => {
    return {
      type: USER_EDITED
    };
  };

  export const editUser = (user) => dispatch => {

     axios.patch('http://localhost:8000/users/edit/' + user._id, user)
    .then((res) => {
      console.log(res.data)
      console.log('User successfully updated')
      dispatch(userEdited())
    }).catch((error) => {
      console.log(error)
    })
 
  // Redirect to Student List 
  //this.props.history.push('/')  
}