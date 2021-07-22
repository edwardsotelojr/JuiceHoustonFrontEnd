import { ORDER } from '../actions/types'
import listo from "../listo.js";

const initialState = {
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
            percentages: action.percentages
          };
          default:
      return state;
    }
}