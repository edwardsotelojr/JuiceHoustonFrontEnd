import {
  LOGIN_ERROR,
  SIGNUP_ERROR,
  SET_CURRENT_USER,
  USER_LOADING,
  USER_UPDATED,
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import history from "../history";

// Register User
export const signup = (userData) => async (dispatch) => {
  const email = userData.email
  console.log("redux signup")
   const a = await axios
    .post("http://localhost:8000/signup", userData)
    .then((res) => {
      console.log(res)
      if (res.data.msg == "success") {
        console.log("go to verify");
        history.push({pathname:"/verify", state: {email}});
      } else if (res.data.msg == "Authenticate") {
        console.log("error with twilio");
      } else if(res.status == 500){
        console.log('500')
        return res.data.msg
      }
    }) // re-direct to login on successful register
    .catch((err) => {
      console.log(err.response.data.msg)
      return err.response.data.msg
      /* dispatch({
        type: SIGNUP_ERROR,
        payload: err.response,
      }) */
    });
    return a
};


// Login - get user token
export const signin = (userData) => (dispatch) => {
  console.log("signin func");
  console.log("userData: ", userData);
  axios
    .post("http://localhost:8000/login", userData)
    .then((res) => {
      console.log("res.data", res.data);
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      console.log("decoded ", decoded.user);
      // Set current user
      dispatch(setCurrentUser(decoded.user));
      dispatch({
        type: LOGIN_ERROR,
        payload: null,
      });
      document.querySelector(".dropdown-menu.show").classList.remove("show");
      if(window.location.pathname == "/Order" || 
      window.location.pathname == "/Menu" ||
      window.location.pathname == "/"){
        return;
      }
      history.push("/");
    })
    .catch((error) => {
      console.log("error ", error.response.data.msg);
      dispatch({
        type: LOGIN_ERROR,
        payload: error,
      });
    });
};

// Login - get user token
export const signinAtCheckout = (token) => (dispatch) => {
  dispatch(setUserLoading())
  localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      console.log("decoded ", decoded.user);
      // Set current user
      dispatch(setCurrentUser(decoded.user));
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};
// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  console.log("logoutUser");
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  if(window.location.pathname == "/checkout"){
    return;
  }
  history.push("/");
};

export const userUpdated = (token, updatedUser) => (dispatch) => {
  console.log("user token: ", updatedUser)
  localStorage.setItem("jwtToken", token);
  // Set token to Auth header
  setAuthToken(token);
  // Set current user
  dispatch(setCurrentUser(updatedUser));
};
