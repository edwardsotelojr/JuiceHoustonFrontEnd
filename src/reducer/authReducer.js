import { SET_CURRENT_USER, USER_LOADING,
  SIGNUP_ERROR, USER_UPDATED, LOGIN_ERROR } from "../actions/types";

const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  error: null
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload),
        loading: false
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_UPDATED:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
      };
      case SIGNUP_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
