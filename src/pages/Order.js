import React, { Component } from "react";
import "./Order.css";
import { list, dailyRecommendation, minerals } from "../MenuList";
import mlist from "../madeDrinks";
import getNutritionalFacts, { getTop6 } from "../utils/getNutritionalFacts";
import {
  Button,
  Container,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { Spring } from "react-spring";
import mixColors from "mix-colors";

class Order extends Component {
  constructor(props) {
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
      pantothenicAcid: 0,
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
    super(props);
    this.state = {
      sizeOfOrder: 3, // number of drinks
      drinks: [{},{},{},{},{}],
      ounces: [0, 0, 0, 0, 0], // max is 18  oz
      size: 16, // sm: 16, md: 20, lg: 24
      currentDrink: 0,
      percentages: [0, 0, 0, 0, 0],
      colors: ["","","","",""],
      cost: [0, 0, 0, 0, 0],
      totalCost: 0,
      vitamins: [{}, {}, {}, {}, {}],
      calories: [0, 0, 0, 0, 0],
      drinkNames: ["", "", "", "", ""],
      drinksNutrition: [nf, nf, nf, nf, nf],
      top6: [[], [], [], [], []],
    };
    this.onCurrentDrink = this.onCurrentDrink.bind(this);
    this.onChange = this.onChange.bind(this);
    this.color = this.color.bind(this);
    this.getCost = this.getCost.bind(this);
    this.getPercentage = this.getPercentage.bind(this);
    this.getCalories = this.getCalories.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
    this.madeDrinkSelected = this.madeDrinkSelected.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.clearDrink = this.clearDrink.bind(this);
    this.checkout = this.checkout.bind(this);
  }

  checkout = () => {
    const { drinks, cost, sizeOfOrder, colors, drinksNutrition, totalCost } = this.state;
    this.props.history.push({
      pathname: "/checkout",
      state: {
        drinks: drinks,
        cost: cost,
        sizeOfOrder: sizeOfOrder,
        color: colors,
        drinksNutrition: drinksNutrition,
        totalCost: totalCost
      },
    });
  }

  clearDrink() {
    var drinks = [...this.state.drinks];
    var drink = { ...drinks[this.state.currentDrink] };
    for (var p in drink) {
      drink[p] = 0;
    }
    drinks[this.state.currentDrink] = drink;
    this.setState(
      {
        drinks: drinks,
      },
      () => {
        this.getPercentage();
        this.color();
        this.getCost();
        this.getCalories();
      }
    );
  }

  madeDrinkSelected(content) {
    var drinks = [...this.state.drinks];
    var drink = { ...drinks[this.state.currentDrink] };
    var contentArray = {};
    var contentOunces = 0;
    for (var p in drink) {
      drink[p] = 0;
    }
    for (var p in content) {
      contentOunces = this.state.size * (content[p] / 100);
      drink[p] = contentOunces;
    }
    drinks[this.state.currentDrink] = drink;
    this.setState(
      {
        drinks: drinks,
      },
      () => {
        this.getPercentage();
        this.color();
        this.getCost();
        this.getCalories();
      }
    );
  }

  nextPage(percentages) {
    const sizeOfOrder = this.state.sizeOfOrder;
    const slicedDrinksPercentage = percentages.slice(0, sizeOfOrder);
    if (slicedDrinksPercentage.some((p) => p < 100)) {
      return this.setState({ nextPageReady: false });
    } else {
      return this.setState({ nextPageReady: true });
    }
  }

  getCost() {
    const drink = this.state.drinks[this.state.currentDrink];
    const copyOfCost = this.state.cost.slice(); //copy the array
    var cost = 0;
    for (const p in drink) {
      // for each produce in drink
      if (drink[p] > 0) {
        // if produce has a value greater than 0
        for (const [key, value] of Object.entries(list)) {
          // for each item in menu list
          if (key === p) {
            // if item equal produce name
            cost =
              cost +
              value.costPerOunce *
                drink[p]; // push color of produce ounce
          }
        }
      }
    }
    copyOfCost[this.state.currentDrink] = cost; // add new volume of drink
    var totalCost = 0;
    for(var i = 0; i < this.state.sizeOfOrder; i++){
      totalCost = copyOfCost[i] + totalCost
    }
    this.setState({ cost: copyOfCost, totalCost: totalCost });
  }

  getCalories() {
    const drink = this.state.drinks[this.state.currentDrink];
    const copyOfCalories = this.state.calories.slice(); //copy the array
    var calories = 0;
    for (const p in this.state.drinks[this.state.currentDrink]) {
      // for each produce in drink
      if (this.state.drinks[this.state.currentDrink][p] > 0) {
        // if produce has a value greater than 0
        for (const produce in list) {
          // for each item in menu list
          if (list[produce].name == p) {
              calories =
              calories +
              list[produce].calories *
                this.state.drinks[this.state.currentDrink][p]; // push color of produce ounce
          }
        }
      }
    }
    copyOfCalories[this.state.currentDrink] = calories; // add new volume of drink
    this.setState({ calories: copyOfCalories });
  }

  // get percentage and ounces
  getPercentage() {
    var num = 0;
    const doubled = Object.entries(
      this.state.drinks[this.state.currentDrink]
    ).map(
      // get new volume of drink
      ([key, value]) => (num += Number(value))
    );
    const newOunces = this.state.ounces.slice(); //copy the array
    newOunces[this.state.currentDrink] = num; // add new volume of drink

    const copyOfPercent = this.state.percentages.slice();
    let percent = (num / this.state.size) * 100;
    copyOfPercent[this.state.currentDrink] = percent; // new percentage of drink
    this.setState({ ounces: newOunces, percentages: copyOfPercent }, () =>
      this.nextPage(copyOfPercent)
    ); 
  }

  // Set color of cup fluid
  color() {
    const newColors = this.state.colors.slice(); //copy the array
    var arrayOfColors = [];
    for (const p in this.state.drinks[this.state.currentDrink]) {
      // for each produce in drink
      if (this.state.drinks[this.state.currentDrink][p] > 0) {
        // if produce has a value greater than 0
        for (const produce in list) {
          // for each item in menu list
          if (list[produce].name == p) {
            // if item equal produce name
            for (
              var i = 0;
              i < this.state.drinks[this.state.currentDrink][p];
              i++
            ) {
              arrayOfColors.push(list[produce].color); // push color of produce ounce
            }
          }
        }
      }
    }
    if (arrayOfColors.length == 0) {
      newColors[this.state.currentDrink] = "";
    } else {
      newColors[this.state.currentDrink] = mixColors(arrayOfColors);
    }
    this.setState({ colors: newColors }); //set the new color
  }

  getDailyValue(mineral, itemValue) {
    let percentage =
      parseFloat(itemValue.replace(/[^\d.-]/g, "")) /
      parseFloat(dailyRecommendation[mineral].replace(/[^\d.-]/g, ""));
    return Math.round(percentage * 100);
  }

  // change drink property
  onChange = (e) => {
    const value = e.target.value.replace(/^0+/, "");
    const name = e.target.name;
    if (this.state.ounces[this.state.currentDrink] > 16) {
      return;
    }
    if (value > 17 - this.state.ounces[this.state.currentDrink]) {
      return;
    }
    const v = this.state.drinks[this.state.currentDrink][name];
    let st = [...this.state.drinks];
    let top6 = [...this.state.top6];
    let drinkNF = [...this.state.drinksNutrition];
    const cDrink = this.state.currentDrink;
    if (v == undefined || v == "") {
      if (value.length == 0) {
        st[this.state.currentDrink] = {
          ...st[this.state.currentDrink],
          [name]: 0,
        };
      } else {
        st[this.state.currentDrink] = {
          ...st[this.state.currentDrink],
          [name]: value,
        };
      }
      this.setState({ drinks: st }, () => {
        //console.log(this.state.drinks[this.state.currentDrink])
        this.getPercentage();
        //this.color();
        this.getCost();
        //this.getCalories();
        drinkNF[cDrink] = getNutritionalFacts(st[cDrink]);
        console.log("nf ", drinkNF[cDrink]);
        top6[cDrink] = getTop6(drinkNF[cDrink]);
        this.setState({
          top6: top6,
          drinksNutrition: drinkNF,
        });
      });
    } else if (
      this.state.percentages[this.state.currentDrink] == 100 && // if drink is full
      value > this.state.drinks[this.state.currentDrink][e.target.name]
    ) {
      // and value is higher than previous value
      return;
    } else if (v >= 0 && v <= this.state.size) {
      if (value.length == 0) {
        st[this.state.currentDrink] = {
          ...st[this.state.currentDrink],
          [name]: 0,
        };
      } else {
        st[this.state.currentDrink] = {
          ...st[this.state.currentDrink],
          [name]: value,
        };
      }
      this.setState({ drinks: st }, () => {
        //console.log(this.state.drinks[this.state.currentDrink])
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
    }
  };

  // change currentDrink value
  onCurrentDrink = (e) => {
    this.setState({
      currentDrink: parseInt(e.target.value),
    });
  };

  getIngredients(content) {
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

  increment = (itemName) => {
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

  decrement = (itemName) => {
    const value = this.state.drinks[this.state.currentDrink][itemName];
    let st = [...this.state.drinks];
    let top6 = [...this.state.top6];
    let drinkNF = [...this.state.drinksNutrition];
    const cDrink = this.state.currentDrink;
    const drink = this.state.drinks[this.state.currentDrink];
    if (value == undefined || value == "" || value == 0) {
      // if value is nil
      return
    } else{
      // between range
      st[this.state.currentDrink] = {
        ...st[this.state.currentDrink],
        [itemName]: parseInt(value) - 1,
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

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  handleScroll = () => {
    //console.log(window.scrollY);
    const div = document.getElementById("remainingOunces");
    const scrollToTop = document.getElementById("scrollToTop");
    const clearButton = document.getElementById("clearButton");
    const rightSide = document.getElementById("right-side");
    const checkoutButton = document.getElementById("checkoutButton")
    const ounces = this.state.ounces[this.state.currentDrink]
    //console.log("outerWidth ", window.outerWidth);
    // Small screen. fixed div
    if(this.state.ounces[this.state.currentDrink] == 0){
      if (window.scrollY > 319 && window.outerWidth < 575) {
        div.style.backgroundColor = "aliceblue";
        div.style.position = "fixed";
        div.style.top = "54px";
        div.style.left = "15px";
        div.style.zIndex = 100;
        div.style.width = "max-content";
        scrollToTop.style.display = "block";
        scrollToTop.style.position = "fixed";
        scrollToTop.style.top = "54px";
        scrollToTop.style.zIndex = 100;
        clearButton.style.position = "fixed";
        clearButton.style.top = "54px";
        clearButton.style.zIndex = 100;
        checkoutButton.style.position = "fixed";
        checkoutButton.style.top = "54px";
        checkoutButton.style.zIndex = 100;
        rightSide.style.display = "none";
        if(ounces > 6){
          checkoutButton.style.left = "269px";
          clearButton.style.left = "173px";
          scrollToTop.style.left = "228px";
        }else{
          checkoutButton.style.left = "276px";
          clearButton.style.left = "180px";
          scrollToTop.style.left = "235px";
        }
      } // small screen. dont fixed div
      else if (window.scrollY <= 319 && window.outerWidth < 575) {
        div.style.backgroundColor = "transparent";
        div.style.position = "relative";
        div.style.top = "auto";
        div.style.left = 0;
        div.style.display = "block";
        scrollToTop.style.display = "none";
        clearButton.style.position = "relative";
        clearButton.style.top = "auto";
        clearButton.style.left = "auto";
        checkoutButton.style.position = "relative";
        checkoutButton.style.top = "auto";
        checkoutButton.style.left = "auto";
        rightSide.style.display = "block";
      } // big screen. fixed div
      else if (window.scrollY > 80 && window.outerWidth >= 575) {
        div.style.backgroundColor = "aliceblue";
        div.style.position = "fixed";
        div.style.top = "54px";
        div.style.left = "15px";
        div.style.zIndex = 100;
        div.style.width = "max-content";
        scrollToTop.style.display = "block";
        scrollToTop.style.position = "fixed";
        scrollToTop.style.top = "54px";
        scrollToTop.style.zIndex = 100;
        clearButton.style.position = "fixed";
        clearButton.style.position = "fixed";
        clearButton.style.top = "54px";
        rightSide.style.display = "block";
        checkoutButton.style.position = "fixed";
        checkoutButton.style.top = "54px";
        checkoutButton.style.zIndex = 100;
        if(ounces > 6){
          checkoutButton.style.left = "269px";
          clearButton.style.left = "173px";
          scrollToTop.style.left = "228px";
        }else{
          checkoutButton.style.left = "266px";
          clearButton.style.left = "180px";
          scrollToTop.style.left = "235px";
        }
        clearButton.style.zIndex = 100;
      } else if (window.scrollY <= 117 && window.outerWidth >= 575) {
        div.style.backgroundColor = "transparent";
        div.style.position = "relative";
        div.style.top = "auto";
        div.style.left = 0;
        div.style.display = "block";
        scrollToTop.style.display = "none";
        clearButton.style.position = "relative";
        clearButton.style.top = "auto";
        clearButton.style.left = "auto";
        checkoutButton.style.position = "relative";
        checkoutButton.style.top = "auto";
        checkoutButton.style.left = "auto";
      } else {
        div.style.backgroundColor = "transparent";
        div.style.position = "relative";
        div.style.top = "auto";
        div.style.left = 0;
        div.style.display = "block";
        scrollToTop.style.display = "none";
        clearButton.style.position = "relative";
        clearButton.style.top = "auto";
        clearButton.style.left = "auto";
        checkoutButton.style.position = "relative";
        checkoutButton.style.top = "auto";
        checkoutButton.style.left = "auto";
      }
    }else{
      if (window.scrollY > 379 && window.outerWidth < 575) {
        div.style.backgroundColor = "aliceblue";
        div.style.position = "fixed";
        div.style.top = "54px";
        div.style.left = "15px";
        div.style.zIndex = 100;
        div.style.width = "max-content";
        scrollToTop.style.display = "block";
        scrollToTop.style.position = "fixed";
        scrollToTop.style.top = "54px";
        scrollToTop.style.zIndex = 100;
        clearButton.style.position = "fixed";
        clearButton.style.top = "54px";
        clearButton.style.zIndex = 100;
        checkoutButton.style.position = "fixed";
        checkoutButton.style.top = "54px";
        checkoutButton.style.zIndex = 100;
        rightSide.style.display = "none";
        if(ounces > 6){
          checkoutButton.style.left = "269px";
          clearButton.style.left = "173px";
          scrollToTop.style.left = "228px";
        }else{
          checkoutButton.style.left = "276px";
          clearButton.style.left = "180px";
          scrollToTop.style.left = "235px";
        }
      } // small screen. dont fixed div
      else if (window.scrollY <= 319 && window.outerWidth < 575) {
        div.style.backgroundColor = "transparent";
        div.style.position = "relative";
        div.style.top = "auto";
        div.style.left = 0;
        div.style.display = "block";
        scrollToTop.style.display = "none";
        clearButton.style.position = "relative";
        clearButton.style.top = "auto";
        clearButton.style.left = "auto";
        checkoutButton.style.position = "relative";
        checkoutButton.style.top = "auto";
        checkoutButton.style.left = "auto";
        rightSide.style.display = "block";
      } // big screen. fixed div
      else if (window.scrollY > 80 && window.outerWidth >= 575) {
        div.style.backgroundColor = "aliceblue";
        div.style.position = "fixed";
        div.style.top = "54px";
        div.style.left = "15px";
        div.style.zIndex = 100;
        div.style.width = "max-content";
        scrollToTop.style.display = "block";
        scrollToTop.style.position = "fixed";
        scrollToTop.style.top = "54px";
        scrollToTop.style.zIndex = 100;
        clearButton.style.position = "fixed";
        clearButton.style.position = "fixed";
        clearButton.style.top = "54px";
        rightSide.style.display = "block";
        checkoutButton.style.position = "fixed";
        checkoutButton.style.top = "54px";
        checkoutButton.style.zIndex = 100;
        if(ounces > 6){
          checkoutButton.style.left = "269px";
          clearButton.style.left = "173px";
          scrollToTop.style.left = "228px";
        }else{
          checkoutButton.style.left = "266px";
          clearButton.style.left = "180px";
          scrollToTop.style.left = "235px";
        }
        clearButton.style.zIndex = 100;
      } else if (window.scrollY <= 117 && window.outerWidth >= 575) {
        div.style.backgroundColor = "transparent";
        div.style.position = "relative";
        div.style.top = "auto";
        div.style.left = 0;
        div.style.display = "block";
        scrollToTop.style.display = "none";
        clearButton.style.position = "relative";
        clearButton.style.top = "auto";
        clearButton.style.left = "auto";
        checkoutButton.style.position = "relative";
        checkoutButton.style.top = "auto";
        checkoutButton.style.left = "auto";
      } else {
        div.style.backgroundColor = "transparent";
        div.style.position = "relative";
        div.style.top = "auto";
        div.style.left = 0;
        div.style.display = "block";
        scrollToTop.style.display = "none";
        clearButton.style.position = "relative";
        clearButton.style.top = "auto";
        clearButton.style.left = "auto";
        checkoutButton.style.position = "relative";
        checkoutButton.style.top = "auto";
        checkoutButton.style.left = "auto";
      }
    }
    
  }

  madeDrinks = () => {
    // var calorie = produceInDrink[0].calories * this.state.size * (50/100)
    return mlist.map((drink, index) => (
      <Row
        key={index}
        style={{
          borderColor: "white",
          borderStyle: "solid",
          borderWidth: "3px",
          borderRadius: "6px",
          backgroundColor: drink.color,
        }}
      >
        <Col>
          <h1>{drink.name}</h1>
          {this.getIngredients(drink.content)}
        </Col>
        <Col xs={3} sm={3} md={3} lg={2} className="align-self-center">
          <Button
            variant="light"
            onClick={() => this.madeDrinkSelected(drink.content)}
          >
            Select
          </Button>
        </Col>
      </Row>
    ));
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleScroll);
    this.nextPage(this.state.percentages);
    this.handleScroll()
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleScroll);
  }
 
  render() {
    const juiceCup = (percent, c) => ({
      height: `${percent}%`,
      backgroundColor: c,
    });
    const drinkButtons = () => {
      const colors = this.state.colors;
      const percentages = this.state.percentages;
      //log("percentages ", this.props.percentages);
      const l = percentages.slice(0, this.state.sizeOfOrder);
      var i = 0;
      const listItems = l.map((percent, index) => (
        <label
          key={index}
          className={"drinkRowName"}
          style={{ display: "inline-grid", margin: "3px", marginBottom: 0,
           justifyContent: "center", width: "31px", overflow: "hidden" }}
        >
          <input
            type="radio"
            key={index}
            checked={this.state.currentDrink == index}
            onChange={this.onCurrentDrink}
            value={index}
          />
          <p style={{ margin: 0, textAlign: "center"}}>{index + 1}</p>
          <Spring from={{ percent: 0 }} to={{ percent: 100 }}>
            {(index) => (
              <div
                className="progress vertical miniDrink"
                style={{
                  height: "35px",
                  width: "25px",
                  marginLeft: 0,
                  marginRight: 0,
                }}
              >
                <div
                  style={juiceCup(percent, colors[i++])}
                  className="progress-bar"
                >
                  <span className="sr-only">{`${percent}%`}</span>
                </div>
              </div>
            )}
          </Spring>
        </label>
      ));
      return listItems;
    };
    const produceFacts = (facts) => {
      return facts.map((fact, index) => <p key={index}>{fact}</p>);
    };

    var listItems = (curentDrink) => {
      var itemList = [];
      for (const [key, item] of Object.entries(list)) {
        itemList.push(
          <Col
            lg={4}
            md={6}
            //className="d-flex align-items-center justify-content-between"
            key={key}
            style={{
              borderColor: "white",
              borderWidth: "thin",
              borderStyle: "solid",
              borderRadius: "25px",
              padding: "7px",
              backgroundColor: item.color + "80",
            }}
          >
            <Row style={{ margin: 0 }}>
              <Col style={{ padding: 0 }}>
                <Row style={{ margin: 0 }}>
                  <Col
                    sm={"auto"}
                    style={{ maxWidth: "min-content", padding: 0, marginLeft: "6px" }}
                  >
                    <img
                      src={item.img}
                      style={{ borderRadius: "10px" }}
                      width="30px"
                      height="30px"
                    />
                  </Col>
                  <Col
                    sm={"auto"}
                    xs={"auto"}
                    md="9"
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                  >
                    <h5 style={{ paddingLeft: "5px", marginTop: "2px" }}>
                      {key}
                    </h5>
                  </Col>
                </Row>
                <Row>
                  <Col
                    style={{
                      margin: "0px 0px 0px 0px",
                      paddingBottom: "0px",
                      height: "170px",
                      overflow: "hidden",
                    }}
                  >
                    {produceFacts(item.shortFacts)}
                  </Col>
                </Row>
              </Col>
              <Col
                className="col-auto"
                style={{ paddingLeft: 0, paddingRight: 0 }}
              >
                <Row className="justify-content-center">
                  <Col
                    className="col-auto"
                    style={{ padding: 0, width: "70px" }}
                  >
                    <input
                      className="inputNumber"
                      type="number"
                      min={0}
                      pattern="[0-9]*"
                      max={this.state.size}
                      id={key}
                      name={key}
                      style={{
                        height: "38px",
                        width: "29px",
                        float: "left",
                        flex: 1,
                        borderRadius: "5px",
                        padding: "4px",
                        paddingRight: 0
                      }}
                      value={
                        this.state.drinks[curentDrink][key]
                          ? this.state.drinks[curentDrink][key]
                          : 0
                      }
                      onChange={this.onChange}
                    ></input>
                    <div className="btn-group-vertical" style={{marginLeft: "3px"}}>
                      <Button
                        style={{
                          border: "none",
                          width: "23px",
                          height: "20px",
                          backgroundColor: "darkseagreen",
                          padding: "0rem 0rem 0rem 0rem",
                        }}
                        onClick={() => this.increment(key)}
                      >
                        <p style={{ fontSize: '10px', margin: 0, marginTop: '-2px', fontWeight: 'bold' }}>+</p>
                      </Button>
                      <Button
                        style={{
                          fontSize: "small",
                          border: "none",
                          width: "23px",
                          height: "20px",
                          backgroundColor: "darkseagreen",
                          padding: "0rem 0rem 0rem 0rem",
                        }}
                        onClick={() => this.decrement(key)}

                      >
                        <p style={{ fontSize: '10px', margin: 0, marginTop: '-2px', fontWeight: 'bold' }}>-</p>
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <p>{item.costPerOunce * 100}¢/oz.</p>
                </Row>
              </Col>
            </Row>
          </Col>
        );
      }
      return itemList;
    };
    const total =
      this.state.cost[0] +
      this.state.cost[1] +
      this.state.cost[2] +
      this.state.cost[3] +
      this.state.cost[4];

    function capitalizeFirstLetter(string) {
      var s = string.charAt(0).toUpperCase() + string.slice(1);
      for (var i = 1; i < s.length; i++) {
        if (s[i] != s[i].toLowerCase()) {
          s = s.slice(0, i) + " " + s.slice(i);
          i = s.length;
        }
      }
      return s;
    }

    return (
      <Container fluid style={{ backgroundColor: "#fffff0", paddingLeft: '10px', paddingRight: '10px'}}>
        {/*  */}
        <Row style={{height: "5px"}}></Row>
        <Row className={" justify-content-center miniScreen"} style={{marginTop: "5px"}}>
          <Col md={6} sm={6} xs={5} style={{ textAlign: "center", marginTop: '10px' }}>
            {" "}
            {/* Current Drink Image Jar */}
            {/* <div>{this.drinkButtons}</div>*/}
            <p style={{marginTop: 0, marginBottom: 0}}># of Drinks</p>
            <ButtonGroup
              name="d"
              toggle
              aria-label="First group"
              size="sm"
              style={{ height: "34px", marginBottom: "9px" }}
            >
              <ToggleButton
                name="3"
                variant="info"
                value={3}
                checked={this.state.sizeOfOrder == 3}
                onClick={() =>
                  this.setState({ sizeOfOrder: 3, currentDrink: 0 })
                }
                type="radio"
              >
                3
              </ToggleButton>
              <ToggleButton
                name="4"
                variant="info"
                type="radio"
                value={4}
                checked={this.state.sizeOfOrder == 4}
                onClick={() =>
                  this.setState({ sizeOfOrder: 4, currentDrink: 0 })
                }
              >
                4
              </ToggleButton>
              <ToggleButton
                name="5"
                variant="info"
                type="radio"
                value={5}
                checked={this.state.sizeOfOrder == 5}
                onClick={() =>
                  this.setState({ sizeOfOrder: 5, currentDrink: 0 })
                }
              >
                5
              </ToggleButton>
            </ButtonGroup>
            <div className={"drinkRow"}>{drinkButtons()}</div>
            <Spring from={{ percent: 0 }} to={{ percent: 100 }}>
              {({ percent }) => (
                <div className="progress vertical ed" style={{marginBottom: 0, marginRight: 0}}>
                  <div
                    style={{
                      height: `${
                        this.state.percentages[this.state.currentDrink]
                      }%`,
                      backgroundColor:
                        this.state.colors[this.state.currentDrink],
                    }}
                    className="progress-bar"
                  >
                    <span className="sr-only">{`${
                      this.state.percentages[this.state.currentDrink]
                    }%`}</span>
                  </div>
                </div>
              )}
            </Spring>
          </Col>
          <Col
            sm={6}
            md={6}
            xs={7}
            style={{ textAlign: "center",  paddingLeft: "0", paddingRight: "3px" }}
          >
            <div id="nutritionfacts">
              <table cellSpacing={"0"} cellPadding={"0"}>
                <tbody>
                 
                  <tr>
                    <td>
                      <div className="headerr">Nutrition Facts</div>
                    </td>
                  </tr>
                  <tr style={{ height: "7px" }}>
                    <td bgcolor="#000000"></td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: "7pt", float: "left" }}>
                      <div className="line">Amount Per Serving</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="line">
                        <div className="label">
                          Calories{" "}
                          <div className="weight">
                            {
                              this.state.drinksNutrition[
                                this.state.currentDrink
                              ].calories
                            }
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="line">
                        <div className="dvlabel" style={{ float: "right" }}>
                          % Daily Value<sup>*</sup>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="line">
                        <div className="label">
                          Total Fat{" "}
                          <div className="weight">
                            {this.state.drinksNutrition[
                              this.state.currentDrink
                            ].totalFat.toFixed(2)}
                            g
                          </div>
                        </div>
                        <div className="dv">10%</div>
                      </div>
                    </td>
                  </tr>
                  <tr></tr>

                  <tr>
                    <td>
                      <div className="line">
                        <div className="label">
                          Total Carbohydrates{" "}
                          <div className="weight">
                  {this.state.drinksNutrition[
                    this.state.currentDrink
                  ].totalCarbohydrate.toFixed(2)}g</div>
                        </div>
                        <div className="dv">11%</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="indent">
                      <div className="line">
                        <div className="labellight">
                          Dietary Fiber <div className="weight">0g</div>
                        </div>
                        <div className="dv">0%</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="indent">
                      <div className="line">
                        <div className="labellight">
                          Sugars <div className="weight">    {this.state.drinksNutrition[
                    this.state.currentDrink
                  ].sugar.toFixed(1)}g</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="line">
                        <div className="label">
                          Protein <div className="weight">{this.state.drinksNutrition[
                    this.state.currentDrink
                  ].protein.toFixed(1)}g</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: "7px" }}>
                    <td bgcolor="#000000"></td>
                  </tr>
                  <tr>
                    <td>
                      <table
                        cellSpacing={"0"}
                        cellPadding={"0"}
                        border="0"
                        className="vitamins"
                      >
                        <tbody>
            {this.state.ounces[this.state.currentDrink] != 0 ? <>
                          <tr>
                            <td>{capitalizeFirstLetter(this.state.top6[this.state.currentDrink][0][0])} &nbsp;&nbsp; {this.state.top6[this.state.currentDrink][0][1].toFixed(1)}%</td>
                            <td align="center">•</td>
                            <td align="right">{capitalizeFirstLetter(this.state.top6[this.state.currentDrink][3][0])} &nbsp;&nbsp; {this.state.top6[this.state.currentDrink][3][1].toFixed(1)}%</td>
                          </tr>
                          <tr>
                            <td>{capitalizeFirstLetter(this.state.top6[this.state.currentDrink][1][0])} &nbsp;&nbsp; {this.state.top6[this.state.currentDrink][1][1].toFixed(1)}%</td>
                            <td align="center">•</td>
                            <td align="right">{capitalizeFirstLetter(this.state.top6[this.state.currentDrink][4][0])} &nbsp;&nbsp; {this.state.top6[this.state.currentDrink][4][1].toFixed(1)}%</td>
                          </tr>
                          <tr>
                            <td>{capitalizeFirstLetter(this.state.top6[this.state.currentDrink][2][0])} &nbsp;&nbsp; {this.state.top6[this.state.currentDrink][2][1].toFixed(1)}%</td>
                            <td align="center">•</td>
                            <td align="right">{capitalizeFirstLetter(this.state.top6[this.state.currentDrink][5][0])} &nbsp;&nbsp; {this.state.top6[this.state.currentDrink][5][1].toFixed(1)}%</td>
                          </tr> </>
                          : <></>}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="line">
                        <div className="labellight">
                          * Based on a regular 2000 calorie diet
                          <br />
                          <br />
                          <i>
                            Nutritional details are an estimate and should only
                            be used as a guide for approximation.
                          </i>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{borderStyle: 'solid', borderRadius: "5px", marginTop: "3px"}}>
              <p style={{margin: 0}}>Drink price: ${this.state.cost[this.state.currentDrink].toFixed(2)}</p>
              <p style={{margin: 0}}>Total: ${this.state.totalCost.toFixed(2)}</p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center " style={{marginTop: "5px"}}>
          <Col>
            <Container>
              <Row className="row justify-content-between">
                <Col
                  style={{
                    paddingTop: "3px",
                    borderRadius: "7px",
                    display: "block",
                    paddingLeft: '5px',
                    paddingRight: "5px",
                    fontSize: "15px"
                  }}
                  className="remainingOunces"
                  id="remainingOunces"
                >
                  Remaining Ounces:{" "}
                  {this.state.size - this.state.ounces[this.state.currentDrink]}
                </Col>
                <Col className="col-6" style={{textAlign: "end"}}>
                  <Button
                    id="clearButton"
                    style={{
                      padding: ".1rem .4rem",
                      borderRadius: "7px",
                       marginRight: "5px",
                       fontSize: "15px"
                    }}
                    onClick={this.clearDrink}
                  >
                    Clear
                  </Button>
                  <Button
                    id="scrollToTop"
                    style={{
                      display: "none",
                      padding: ".1rem .4rem",
                      borderRadius: "7px"
                    }}
                    onClick={this.scrollToTop}
                  >
                    ⬆
                  </Button>
                  <Button
                    id={"checkoutButton"}
                    disabled={!this.state.nextPageReady}
                    style={{
                      padding: ".1rem .4rem",
                      borderRadius: "7px",
                      marginRight: '0px',
                      fontSize: "15px"

                    }} variant="success"
                    onClick={this.checkout}
                  >
                    Checkout
                  </Button>
                </Col>
              </Row>
              <Row style={{marginTop: "3px"}}>{listItems(this.state.currentDrink)}</Row>
            </Container>
            <br />
            <Container fluid="md">{this.madeDrinks()}</Container>
          </Col>
          <Col sm={4} xs={12} id="right-side">
            <div style={{ position: "sticky", top: "60px" }}>
            <Row className="justify-content-md-center">
          <Col
            style={{ display: "flex" }}
            className="justify-content-md-center"
          >
            <p style={{ fontSize: "large" }}># of Drinks</p>
            <ButtonGroup
              name="d"
              toggle
              aria-label="First group"
              size="sm"
              style={{ height: "34px", marginLeft: "4px", marginTop: "-5px" }}
            >
              <ToggleButton
                name="3"
                variant="info"
                value={3}
                checked={this.state.sizeOfOrder == 3}
                onClick={() =>
                  this.setState({ sizeOfOrder: 3, currentDrink: 0 })
                }
                type="radio"
              >
                3
              </ToggleButton>
              <ToggleButton
                name="4"
                variant="info"
                type="radio"
                value={4}
                checked={this.state.sizeOfOrder == 4}
                onClick={() =>
                  this.setState({ sizeOfOrder: 4, currentDrink: 0 })
                }
              >
                4
              </ToggleButton>
              <ToggleButton
                name="5"
                variant="info"
                type="radio"
                value={5}
                checked={this.state.sizeOfOrder == 5}
                onClick={() =>
                  this.setState({ sizeOfOrder: 5, currentDrink: 0 })
                }
              >
                5
              </ToggleButton>
            </ButtonGroup>
          </Col>
        </Row>
              <Row className="justify-content-center">
                {" "}
                {/* Current Drink Image Jar */}
                {/* <div>{this.drinkButtons}</div>*/}
                <div className={"drinkRow"} style={{marginRight: '4px'}}>{drinkButtons()}</div>
              </Row>
              <Row className="justify-content-center" >
                <Spring from={{ percent: 0 }} to={{ percent: 100 }}  >
                  {({ percent }) => (
                    <div className="progress vertical ed" style={{marginRight: '5px', marginBottom: '5px'}}>
                      <div
                        style={{
                          height: `${
                            this.state.percentages[this.state.currentDrink]
                          }%`,
                          backgroundColor:
                            this.state.colors[this.state.currentDrink],
                        }}
                        className="progress-bar"
                      >
                        <span className="sr-only">{`${
                          this.state.percentages[this.state.currentDrink]
                        }%`}</span>
                      </div>
                    </div>
                  )}
                </Spring>
              </Row>

              <Row
                className="justify-content-center"
                style={{ marginTop: "10px" }}
              >
                <Col
                  
                  className="col-lg-9 col-md-10 col-sm-12"
                  style={{ border: "none", padding: 0, paddingRight: '5px' }}
                >
              
            <div id="nutritionfacts">
              <table cellSpacing={"0"} cellPadding={"0"}>
                <tbody>
                  <tr>
                    <td align="center" className="header">
                      Nutrition Facts
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="headerr">Nutrition Facts</div>
                    </td>
                  </tr>
                  <tr style={{ height: "7px" }}>
                    <td bgcolor="#000000"></td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: "7pt", float: "left" }}>
                      <div className="line">Amount Per Serving</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="line">
                        <div className="label">
                          Calories{" "}
                          <div className="weight">
                            {
                              this.state.drinksNutrition[
                                this.state.currentDrink
                              ].calories
                            }
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="line">
                        <div className="dvlabel" style={{ float: "right" }}>
                          % Daily Value<sup>*</sup>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="line">
                        <div className="label">
                          Total Fat{" "}
                          <div className="weight">
                            {this.state.drinksNutrition[
                              this.state.currentDrink
                            ].totalFat.toFixed(2)}
                            g
                          </div>
                        </div>
                        <div className="dv">10%</div>
                      </div>
                    </td>
                  </tr>
                  <tr></tr>

                  <tr>
                    <td>
                      <div className="line">
                        <div className="label">
                          Total Carbohydrates{" "}
                          <div className="weight">
                  {this.state.drinksNutrition[
                    this.state.currentDrink
                  ].totalCarbohydrate.toFixed(2)}g</div>
                        </div>
                        <div className="dv">11%</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="indent">
                      <div className="line">
                        <div className="labellight">
                          Dietary Fiber <div className="weight">0g</div>
                        </div>
                        <div className="dv">0%</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="indent">
                      <div className="line">
                        <div className="labellight">
                          Sugars <div className="weight">    {this.state.drinksNutrition[
                    this.state.currentDrink
                  ].sugar.toFixed(1)}g</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="line">
                        <div className="label">
                          Protein <div className="weight">{this.state.drinksNutrition[
                    this.state.currentDrink
                  ].protein.toFixed(1)}g</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr style={{ height: "7px" }}>
                    <td bgcolor="#000000"></td>
                  </tr>
                  <tr>
                    <td>
                      <table
                        cellSpacing={"0"}
                        cellPadding={"0"}
                        border="0"
                        className="vitamins"
                      >
                        <tbody>
            {this.state.ounces[this.state.currentDrink] != 0 ? <>
                          <tr>
                            <td>{capitalizeFirstLetter(this.state.top6[this.state.currentDrink][0][0])} &nbsp;&nbsp; {this.state.top6[this.state.currentDrink][0][1].toFixed(1)}%</td>
                            <td align="center">•</td>
                            <td align="right">{capitalizeFirstLetter(this.state.top6[this.state.currentDrink][3][0])} &nbsp;&nbsp; {this.state.top6[this.state.currentDrink][3][1].toFixed(1)}%</td>
                          </tr>
                          <tr>
                            <td>{capitalizeFirstLetter(this.state.top6[this.state.currentDrink][1][0])} &nbsp;&nbsp; {this.state.top6[this.state.currentDrink][1][1].toFixed(1)}%</td>
                            <td align="center">•</td>
                            <td align="right">{capitalizeFirstLetter(this.state.top6[this.state.currentDrink][4][0])} &nbsp;&nbsp; {this.state.top6[this.state.currentDrink][4][1].toFixed(1)}%</td>
                          </tr>
                          <tr>
                            <td>{capitalizeFirstLetter(this.state.top6[this.state.currentDrink][2][0])} &nbsp;&nbsp; {this.state.top6[this.state.currentDrink][2][1].toFixed(1)}%</td>
                            <td align="center">•</td>
                            <td align="right">{capitalizeFirstLetter(this.state.top6[this.state.currentDrink][5][0])} &nbsp;&nbsp; {this.state.top6[this.state.currentDrink][5][1].toFixed(1)}%</td>
                          </tr> </>
                          : <></>}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="line">
                        <div className="labellight">
                          * Based on a regular 2000 calorie diet
                          <br />
                          <br />
                          <i>
                            Nutritional details are an estimate and should only
                            be used as a guide for approximation.
                          </i>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
                </Col>
              </Row>
              <Row
                className="justify-content-center"
                style={{ marginTop: "10px" }}
              >
                <Col
                  className="col-lg-9 col-md-10 col-sm-12"
                  style={{ borderRadius: "6px", borderStyle: "solid", marginRight: '5px' }}
                >
                  <p style={{marginBottom: '5px'}}>
                    Cost of Drink: $
                    {this.state.cost[this.state.currentDrink].toFixed(2)}
                  </p>
                  <p  style={{marginBottom: '5px'}}>Total: ${total.toFixed(2)}</p>
                </Col>
              </Row>
            
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Order;
