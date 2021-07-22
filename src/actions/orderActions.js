import { ORDER } from './types'
export const setOrder = (drinks, cost, sizeOfOrder, colors, percentages) => dispatch => {
  console.log(drinks)
  dispatch({
        drinks: drinks, 
        cost: cost, 
        sizeOfOrder: sizeOfOrder,
        colors: colors,
        percentages: percentages, 
        type: ORDER
      });
}
