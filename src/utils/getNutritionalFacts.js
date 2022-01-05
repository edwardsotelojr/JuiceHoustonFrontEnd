//
import { listt, dailyRecommendation } from "../MenuList.js";
export default function getNutritionalFacts(drink) {
  //var nf = item(drink)
  const nf = {
    calories: 0,
    totalFat: 0,
    sodium: 0,
    totalCarbohydrate: 0,
    sugar: 0,
    vitaminA: 0,
    thiamin: 0,
    riboflavin: 0,
    niacin: 0,
    vitaminB5: 0,
    vitaminB6: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0,
    vitaminK: 0,
    betaine: 0,
    choline: 0,
    calcium: 0,
    copper: 0,
    iron: 0,
    magnesium: 0,
    manganese: 0,
    phosphorus: 0,
    potassium: 0,
    selenium: 0,
    sodium: 0,
    zinc: 0,
    protein: 0,
  };
  var regex = /[+-]?\d+(\.\d+)?/g;
  for (const [i, amount] of Object.entries(drink)) {
    for (var j = 0; j < amount; j++) {
      for (const [key, value] of Object.entries(nf)) {
        var removeUnits = String(listt[i][key])
          .match(regex)
          .map(function (v) {
            return parseFloat(v);
          });
          nf[key] = nf[key] + removeUnits[0];
      }
    }
  }
  console.log("nf ", nf)
  return nf;
}
export function getTop6(info) {
    const remove = ["calories", "protein", 
    "totalCarbohydrate", "totalFat", "sugar", "cholesterol"]
  var removedInfo = info;
  var dr = dailyRecommendation;
  var regex = /[+-]?\d+(\.\d+)?/g;
  var percentage = 0;
  var ranking = [];
  for (const [key, value] of Object.entries(dr)) {
    if(remove.includes(key)){
        continue;
    }
    var removedUnit = value.match(regex).map(function (v) {
      return parseFloat(v);
    });
    if(removedInfo[key] === undefined){
        continue;
    }
      percentage = ( Number(removedInfo[key]) / removedUnit[0]) * 100;
      ranking.push([key, percentage]);
}
    ranking.sort((a, b) => b[1] - a[1]);
    return ranking.slice(0, 6)
}