import { ORDER } from '../actions/types'
import listo from "../listo.js";

const initialState = {
  loading: true,
      drinks: [listo, listo, listo, listo, listo],
      cost: [0, 0, 0, 0, 0],
      sizeOfOrder: 3,
      colors: ["", "", "", "", ""],
      percentages: [0, 0, 0, 0, 0]
  };
  export default function (state = initialState, action) {
    switch (action.type) {
      case ORDER:
        console.log("here ", action.percentages)
        return {
            ...state,
            drinks: action.drinks,
            cost: action.cost,
            sizeOfOrder: action.sizeOfOrder,
            colors: action.colors,
            percentages: action.percentages,
            userOrders: []
          };
          break;
        case "userOrders":
          console.log("a ",action.payload)
          return{
            ...state,
            userOrders: action.payload,
            loading: false
          }
          case "LOADING":
            return{
              ...state,
              loading: true,
            } 
          default:
      return state;
    }
}