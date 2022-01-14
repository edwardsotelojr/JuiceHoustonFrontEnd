import axios from "axios";
import history from '../history'

import { ORDER } from "./types";
export const placeOrder =
  order => (dispatch) => {
    console.log(order);
    axios.post('http://localhost:8000/placeOrder', order).then(res => 
    {console.log(res)
      history.push({
        pathname: "/orderConfirmation",
      });  
    }
    )
  };

export const getDrink = (drinkId) => (dispatch) => {
  axios
    .get(`http://localhost:8000/drink/?drinkId=${drinkId}`)
    .then((res) => {
      console.log(res);
      
    })
    .catch((err) => console.log(err));
};

export const getUserOrders = (user_id) => (dispatch) => {
  console.log(user_id);
  const user = null;
  axios
    .get(`http://localhost:8000/orders/?user=${user_id}`)
    .then((res) => {
      console.log("res ", res.data);
      user = res.data;
      dispatch({
        type: "userOrders",
        payload: res.data,
      });
    })
    .then(function () {
      getDrink(user.drinks);
    })
    .catch((err) => console.log(err));
};

export const loading = (dispatch) => {
  dispatch({
    type: "LOADING",
  });
};
