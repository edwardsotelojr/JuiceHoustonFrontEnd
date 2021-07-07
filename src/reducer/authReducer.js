import {
    SET_CURRENT_USER,
    USER_LOADING,
    USER_EDITED
  } from "../actions/types";

  const isEmpty = require("is-empty");
  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        console.log("action.payload ", action.payload)
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload.user
        };
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
        case USER_EDITED:
          return {
            ...state,
            user: action.payload
          };
      default:
        return state;
    }
  }