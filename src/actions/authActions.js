import {
  LOGIN_ERROR,
  SIGNUP_ERROR,
  SET_CURRENT_USER,
  USER_LOADING,
  USER_EDITED,
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import history from "../history";

// Register User
export const signup = (userData) => (dispatch) => {
  const email = userData.email
  axios
    .post("http://localhost:8000/signup", userData)
    .then((res) => {
      if (res.data.msg == "success") {
        console.log("go to verify");
        history.push({pathname:"/verify", state: {email}});
      } else if (res.data.msg == "Authenticate") {
        console.log("error with twilio");
      } else {
        console.log(res.data);
      }
    }) // re-direct to login on successful register
    .catch((err) =>
      dispatch({
        type: SIGNUP_ERROR,
        payload: err.response,
      })
    );
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
export const signinAtCheckout = (userData) => (dispatch) => {
  console.log("signin func");
  console.log("userData: ", userData);
  axios
    .post("http://localhost:8000/login", userData)
    .then((res) => {
      console.log("res.data", res.data);
      // Save to localStorage
      // Set token to localStorage
      const { token, user } = res.data;
      localStorage.setItem("jwtToken", token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      console.log("decoded ", decoded.user);
      return user;
    })
    .catch((error) => {
      console.log("error ", error.response.data.msg);
      dispatch({
        type: LOGIN_ERROR,
        payload: error,
      });
    });
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
  history.push("/");
};

export const userEdited = (updatedUser) => {
  return {
    payload: updatedUser,
    type: USER_EDITED,
  };
};

export const editUser = (user) => (dispatch) => {
  console.log("sending: ", user);
  axios
    .patch("http://localhost:8000/users/edit/" + user._id, user)
    .then((res) => {
      console.log("User successfully updated", res.data);
      dispatch(userEdited(res.data));
    })
    .catch((error) => {
      console.log(error);
    });

  // Redirect to Student List
  //this.props.history.push('/')
};
