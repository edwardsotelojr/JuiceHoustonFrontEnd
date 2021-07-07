import axios from "axios";
import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS,
} from "./action-types";
import setAuthToken from '../'

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:8000/signup", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:8000/signin", userData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
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

//Sign up action creators
const signUpRequest = () => {
  return {
    type: SIGN_UP_REQUEST,
  };
};
const signUpSuccess = (user) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: {
      user,
    },
  };
};
const signUpFailure = (error) => {
  return {
    type: SIGN_UP_FAILURE,
    payload: error,
  };
};

export const signUp = (user, history) => {
  return function (dispatch) {
    dispatch(signUpRequest());
    axios({
      method: "post",
      url: "/signUp",
      data: user,
    })
      .then((response) => {
        const { data } = response.data;
        dispatch(signUpSuccess(data));
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        dispatch(signUpFailure(error));
      });
  };
};

//Sign in action creators
const signInRequest = () => {
  return {
    type: SIGN_IN_REQUEST,
  };
};
const signInSuccess = (token) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      token,
    },
  };
};
const signInFailure = (error) => {
  return {
    type: SIGN_IN_FAILURE,
    payload: error,
  };
};


//sign out action creators
export const signOutRequest = function () {
  return {
    type: SIGN_OUT_REQUEST,
  };
};

export const signOutSuccess = function () {
  return {
    type: SIGN_OUT_SUCCESS,
  };
};

export const signOutFailure = function () {
  return {
    type: SIGN_OUT_FAILURE,
  };
};

export const signOut = function (history) {
  return function (dispatch) {
    dispatch(signOutRequest());
    localStorage.clear();
    history.push("/signin");
    if (localStorage.getItem("USER_TOKEN")) {
      dispatch(signOutFailure());
    } else {
      dispatch(signOutSuccess());
    }
  };
};