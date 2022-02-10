import getNutritionalFacts, { getTop6 } from "./getNutritionalFacts";

export const increment = (itemName) => {
    const value = this.state.drinks[this.state.currentDrink][itemName];
    let st = [...this.state.drinks];
    let top6 = [...this.state.top6];
    let drinkNF = [...this.state.drinksNutrition];
    const cDrink = this.state.currentDrink;
    const drink = this.state.drinks[this.state.currentDrink];
    if (value == undefined || value == "") {
      // if value is nil
      st[this.state.currentDrink] = {
        ...st[this.state.currentDrink],
        [itemName]: 1,
      };
      this.setState({ drinks: st }, () => {
        this.getPercentage();
        //this.color();
        this.getCost();
        //this.getCalories();
        drinkNF[cDrink] = getNutritionalFacts(st[cDrink]);
        top6[cDrink] = getTop6(drinkNF[cDrink]);
        this.setState({
          top6: top6,
          drinksNutrition: drinkNF,
        });
      });
    } else if (
      this.state.percentages[this.state.currentDrink] == 100 && // if drink is full
      value > this.state.drinks[this.state.currentDrink][itemName]
    ) {
      // and value is higher than previous value
      return;
    } else if (value >= 0 && value <= this.state.size) {
      // between range
      st[this.state.currentDrink] = {
        ...st[this.state.currentDrink],
        [itemName]: parseInt(value) + 1,
      };
      this.setState({ drinks: st }, () => {
        this.getPercentage();
        this.color();
        this.getCost();
        //this.getCalories();
        drinkNF[cDrink] = getNutritionalFacts(st[cDrink]);
        top6[cDrink] = getTop6(drinkNF[cDrink]);
        this.setState({
          top6: top6,
          drinksNutrition: drinkNF,
        });
      });
    }
  };