import axios from 'axios';
import { ORDER } from './types'
export const setOrder = (drinks, cost, sizeOfOrder, colors, percentages) => dispatch => {
  console.log(drinks)
  dispatch({
    loading: true,
        drinks: drinks, 
        cost: cost, 
        sizeOfOrder: sizeOfOrder,
        colors: colors,
        percentages: percentages, 
        type: ORDER
      });
}

export const getDrink = (drinkId) => dispatch => {
  axios.get(`http://localhost:8000/drink/?drinkId=${drinkId}`)
  .then(res =>{
    console.log(res)
    return("ded")
  })
    .catch(
      err => console.log(err)
    )
}

export const getUserOrders = (user_id) => dispatch => {
  console.log(user_id)
  const user = null
  axios.get(`http://localhost:8000/orders/?user=${user_id}`)
  .then(res => {
    console.log("res ",res.data);
    user = res.data
    dispatch({
      type: "userOrders",
      payload: res.data
    })
  })
  .then(function (){getDrink(user.drinks)})
  .catch(err => console.log(err))
}

export const loading = (dispatch) => {
  dispatch({
    type: "LOADING"
  })
}