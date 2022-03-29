import { list } from "../MenuList";


export default function getIngredients(content) {
    var produceInDrink = [];
    const drinksPercentage = [];
    for (var key in content) {
      // drinks ingredients
      if (key != "name") {
        drinksPercentage.push(key); //append array for percentage of produce
      }
      for (var k in list) {
        // objects of produce
        if (list[k].name === key) {
          produceInDrink.push(list[k]); //get produce object
        }
      }
    }
    const dr = produceInDrink.map((item, index) => (
      <p key={index} style={{ marginBottom: 0 }}>
        {item.name} {content[item.name]}%
      </p>
    ));
    return <div>{dr}</div>;
  }