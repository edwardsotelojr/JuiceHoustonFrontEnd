import { LOGIN_ERROR, SET_CURRENT_USER, USER_LOADING } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import history from "../history";

// Login - get user token
export const signin = (userData) => (dispatch) => {
  axios
    .post("https://34.229.165.152:8080/login/", userData, {
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      console.log("res: ", res)
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded.user));
      dispatch({
        type: LOGIN_ERROR,
        payload: null,
      });
      if (
        window.location.pathname === "/Order" ||
        window.location.pathname === "/Menu" ||
        window.location.pathname === "/"
      ) {
        return;
      }
      history.push("/");
    })
    .catch(function (error) {
      console.log("error: ", error)
      dispatch({
        type: LOGIN_ERROR,
        payload: error.message,
      });
    });
};

// Login - get user token
export const signinAtCheckout = (token) => (dispatch) => {
  dispatch(setUserLoading());
  localStorage.setItem("jwtToken", token);
  // Set token to Auth header
  setAuthToken(token);
  // Decode token to get user data
  const decoded = jwt_decode(token);
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
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  if (window.location.pathname === "/checkout") {
    return;
  }
  history.push("/");
};

export const userUpdated = (token, updatedUser) => (dispatch) => {
  localStorage.setItem("jwtToken", token);
  // Set token to Auth header
  setAuthToken(token);
  // Set current user
  dispatch(setCurrentUser(updatedUser));
};
