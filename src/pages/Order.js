import React, { Component } from "react";
import "./Order.css";
import { list, dailyRecommendation, minerals } from "../MenuList";
import fuji from "../assets/fuji-apple.jpg";
import mlist from "../madeDrinks";
import getNutritionalFacts, { getTop3 } from "../utils/getNutritionalFacts";
import {
  Button,
  Container,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  InputGroup,
} from "react-bootstrap";
import { Spring } from "react-spring";
import mixColors from "mix-colors";
import { Link } from "react-router-dom";
import listo from "../listo.js";

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
      sizeOfOrder: this.props.sizeOfOrder, // number of drinks
      drinks: this.props.drinks,
      ounces: [0, 0, 0, 0, 0], // max is 18  oz
      size: 16, // sm: 16, md: 20, lg: 24
      currentDrink: 0,
      percentages: this.props.percentages,
      colors: this.props.colors,
      cost: this.props.cost,
      vitamins: [{}, {}, {}, {}, {}],
      calories: [0, 0, 0, 0, 0],
      drinkNames: ["", "", "", "", ""],
      drinksNutrition: [nf, nf, nf, nf, nf],
      top3: [[], [], []],
    };
    this.onCurrentDrink = this.onCurrentDrink.bind(this);
    this.onChange = this.onChange.bind(this);
    this.color = this.color.bind(this);
    this.getVitamins = this.getVitamins.bind(this);
    this.getCost = this.getCost.bind(this);
    this.getPercentage = this.getPercentage.bind(this);
    this.getCalories = this.getCalories.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
    this.madeDrinkSelected = this.madeDrinkSelected.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.clearDrink = this.clearDrink.bind(this);
    this.checkout = this.checkout.bind(this);
  }

  checkout() {
    //window.location.href='/checkout'
    const { drinks, cost, sizeOfOrder, colors, percentages } = this.state;
    this.props.setOrder(drinks, cost, sizeOfOrder, colors, percentages);
    this.props.history.push({
      pathname: "/checkout",
      state: {
        drinks: this.state.drinks,
        cost: this.state.cost,
        sizeOfOrder: this.state.sizeOfOrder,
        color: this.state.colors,
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
        this.getVitamins();
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
        this.getVitamins();
        this.getCost();
        this.getCalories();
      }
    );
  }

  nextPage(percentages) {
    //console.log("nextpage");
    const sizeOfOrder = this.state.sizeOfOrder;
    const slicedDrinksPercentage = percentages.slice(0, sizeOfOrder);
    //console.log(
    // slicedDrinksPercentage,
    // " ",
    //slicedDrinksPercentage.some((p) => p < 100)
    //);

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
    for (const p in this.state.drinks[this.state.currentDrink]) {
      // for each produce in drink
      if (this.state.drinks[this.state.currentDrink][p] > 0) {
        // if produce has a value greater than 0
        for (const produce in list) {
          // for each item in menu list
          if (list[produce] == p) {
            // if item equal produce name
            cost =
              cost +
              list[produce].costPerOunce *
                this.state.drinks[this.state.currentDrink][p]; // push color of produce ounce
          }
        }
      }
    }
    copyOfCost[this.state.currentDrink] = cost; // add new volume of drink
    this.setState({ cost: copyOfCost });
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
            // if item equal produce name
            //console.log("list[produce]: ", list[produce])
            //console.log("this.state.drinks[this.state.currentDrink][p]: ", this.state.drinks[this.state.currentDrink][p])
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

  getVitamins() {
    const drink = this.state.drinks[this.state.currentDrink];
    let st = [...this.state.vitamins];
    var vitamins = {};
    for (const p in this.state.drinks[this.state.currentDrink]) {
      // for each produce in drink
      if (this.state.drinks[this.state.currentDrink][p] > 0) {
        // if produce has a value greater than 0
        for (const produce in list) {
          // for each item in menu list
          if (produce == p) {
            //console.log("produce: ", produce)
            // if item equal produce name
            //cost = cost + (list[produce].costPerOunce * this.state.drinks[this.state.currentDrink][p]); // push color of produce ounce
            for (const a in produce.vitamins) {
              //console.log(a); /// HERE
              //console.log("produce.vitamins: ", a)
            }
          }
        }
      }
    }
    /*st[this.state.currentDrink] = {
      ...st[this.state.currentDrink],
      [e.target.name]: parseInt(e.target.value),
    };
    this.setState({ vitamins: st });
    */
  }

  getPercentage() {
    var num = 0;
    const doubled = Object.entries(
      this.state.drinks[this.state.currentDrink]
    ).map(
      // get new volume of drink
      ([key, value]) => (num += value)
    );
    const newOunces = this.state.ounces.slice(); //copy the array
    newOunces[this.state.currentDrink] = num; // add new volume of drink

    const copyOfPercent = this.state.percentages.slice();
    let percent = (num / this.state.size) * 100;
    copyOfPercent[this.state.currentDrink] = percent; // new percentage of drink
    this.setState({ ounces: newOunces, percentages: copyOfPercent }, () =>
      this.nextPage(copyOfPercent)
    ); //set the new state
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
    //console.log('onChange')
    const value = e.target.value.replace(/^0+/, "");
    let st = [...this.state.drinks];
    if (value == undefined || value == "") {
      // if value is nil
      st[this.state.currentDrink] = {
        ...st[this.state.currentDrink],
        [e.target.name]: 0,
      };
      return this.setState({ drinks: st }, () => {
        this.getPercentage();
        this.color();
        this.getVitamins();
        this.getCost();
        this.getCalories();
        getNutritionalFacts();
      });
    } else if (
      this.state.percentages[this.state.currentDrink] == 100 && // if drink is full
      value > this.state.drinks[this.state.currentDrink][e.target.name]
    ) {
      // and value is higher than previous value
      return;
    } else if (value >= 0 && value <= this.state.size) {
      // between range
      st[this.state.currentDrink] = {
        ...st[this.state.currentDrink],
        [e.target.name]: parseInt(value),
      };
      this.setState({ drinks: st }, () => {
        this.getPercentage();
        this.color();
        this.getVitamins();
        this.getCost();
        this.getCalories();
        getNutritionalFacts();
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
    //console.log(content);
    const dr = produceInDrink.map((item, index) => (
      <p key={index} style={{ marginBottom: 0 }}>
        {item.name} {content[item.name]}%
      </p>
    ));
    return <div>{dr}</div>;
  }

  increment = (itemName) => {
    //console.log(itemName)
    //console.log(this.state.drinks[this.state.currentDrink][itemName])
    const value = this.state.drinks[this.state.currentDrink][itemName];
    let st = [...this.state.drinks];
    let top3 = [...this.state.top3];
    let drinkNF = [...this.state.drinksNutrition];
    const cDrink = this.state.currentDrink;
    const drink = this.state.drinks[this.state.currentDrink];
    if (value == undefined || value == "") {
      // if value is nil
      //console.log('here undefined')
      st[this.state.currentDrink] = {
        ...st[this.state.currentDrink],
        [itemName]: 1,
      };
      this.setState({ drinks: st }, () => {
        //console.log(this.state.drinks[this.state.currentDrink])
        this.getPercentage();
        //this.color();
        this.getVitamins();
        //this.getCost();
        //this.getCalories();
        drinkNF[cDrink] = getNutritionalFacts(st[cDrink]);
        console.log("nf ", drinkNF[cDrink]);
        top3[cDrink] = getTop3(drinkNF[cDrink]);
        this.setState({
          top3: top3,
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
        this.getVitamins();
        //this.getCost();
        //this.getCalories();
        drinkNF[cDrink] = getNutritionalFacts(st[cDrink]);
        console.log("nf ", drinkNF[cDrink]);
        top3[cDrink] = getTop3(drinkNF[cDrink]);
        this.setState({
          top3: top3,
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

  handleScroll(event) {
    //console.log(window.scrollY);
    const div = document.getElementById("remainingOunces");
    const scrollToTop = document.getElementById("scrollToTop");
    const clearButton = document.getElementById("clearButton");
    const rightSide = document.getElementById("right-side");
    //console.log("outerWidth ", window.outerWidth);
    // Small screen. fixed div
    if (window.scrollY > 309 && window.outerWidth < 575) {
      console.log(div);
      div.style.backgroundColor = "aliceblue";
      div.style.position = "fixed";
      div.style.top = "54px";
      div.style.left = "15px";
      div.style.zIndex = 100;
      div.style.width = "max-content";
      scrollToTop.style.display = "block";
      scrollToTop.style.position = "fixed";
      scrollToTop.style.top = "54px";
      scrollToTop.style.left = "269px";
      scrollToTop.style.zIndex = 100;
      clearButton.style.position = "fixed";
      clearButton.style.top = "54px";
      clearButton.style.left = "212px";
      clearButton.style.zIndex = 100;
      rightSide.style.display = "none";
    } // small screen. dont fixed div
    else if (window.scrollY <= 309 && window.outerWidth < 575) {
      div.style.backgroundColor = "transparent";
      div.style.position = "relative";
      div.style.top = "auto";
      div.style.left = 0;
      div.style.display = "block";
      scrollToTop.style.display = "none";
      clearButton.style.position = "relative";
      clearButton.style.top = "auto";
      clearButton.style.left = "auto";
      rightSide.style.display = "block";
    } // big screen. fixed div
    else if (window.scrollY > 117 && window.outerWidth >= 575) {
      div.style.backgroundColor = "aliceblue";
      div.style.position = "fixed";
      div.style.top = "54px";
      div.style.left = "15px";
      div.style.zIndex = 100;
      div.style.width = "max-content";
      scrollToTop.style.display = "block";
      scrollToTop.style.position = "fixed";
      scrollToTop.style.top = "54px";
      scrollToTop.style.left = "269px";
      scrollToTop.style.zIndex = 100;
      clearButton.style.position = "fixed";
      clearButton.style.position = "fixed";
      clearButton.style.top = "54px";
      clearButton.style.left = "212px";
      rightSide.style.display = "block";

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
          style={{ display: "inline-grid" }}
        >
          <input
            type="radio"
            key={index}
            checked={this.state.currentDrink == index}
            onChange={this.onCurrentDrink}
            value={index}
          />
          drink {index + 1}
          <Spring from={{ percent: 0 }} to={{ percent: 100 }}>
            {(index) => (
              <div
                className="progress vertical miniDrink"
                style={{
                  height: "40px",
                  width: "40px",
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
              padding: "12px",
              backgroundColor: item.color + "80",
            }}
          >
            <Row style={{ margin: 0 }}>
              <Col style={{ padding: 0 }}>
                <Row style={{ margin: 0 }}>
                  <Col
                    sm={"auto"}
                    style={{ maxWidth: "min-content", padding: 0 }}
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
                      overflow: "scroll",
                    }}
                  >
                    {produceFacts(item.shortFacts)}
                  </Col>
                </Row>
              </Col>
              <Col
                className="col-auto"
                style={{ paddingLeft: 0, paddingRight: 0, marginRight: "9px" }}
              >
                <Row className="justify-content-center">
                  <Col className="col-auto" style={{ padding: 0 }}>
                    <input
                      className="inputNumber"
                      type="number"
                      min={0}
                      pattern="[0-9]*"
                      max={this.state.size}
                      id={item.name}
                      name={item.name}
                      style={{
                        height: "40px",
                        width: "40px",
                        flex: 1,
                        borderRadius: "5px",
                      }}
                      value={
                        this.state.drinks[curentDrink][key]
                          ? this.state.drinks[curentDrink][key]
                          : 0
                      }
                      onChange={this.onChange}
                    ></input>
                    <Button
                      style={{
                        fontSize: "large",
                        border: "none",
                        width: "25px",
                        backgroundColor: "darkseagreen",
                        padding: "0rem 0rem 0rem 0rem",
                      }}
                      onClick={() => this.increment(key)}
                    >
                      +
                    </Button>
                    <Button
                      style={{
                        fontSize: "large",
                        border: "none",
                        width: "25px",
                        backgroundColor: "darkseagreen",
                        padding: "0rem 0rem 0rem 0rem",
                      }}
                    >
                      -
                    </Button>
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

      function capitalizeFirstLetter(string){
        var s = string.charAt(0).toUpperCase() + string.slice(1);
        for(var i = 1; i< s.length; i++){
          if(s[i] != s[i].toLowerCase()){
            s = s.slice(0, i) + " " + s.slice(i);
            i = s.length
          }
        }
        return s;
      }

    return (
      <Container fluid style={{ backgroundColor: "#fffff0" }}>
        <br />
        <Row className="justify-content-md-center">
          <Col
            sm={7}
            xs={8}
            style={{ display: "flex" }}
            className="justify-content-md-center"
          >
            <p style={{ fontSize: "larger" }}>Amount of Drinks:</p>
            <ButtonGroup
              name="d"
              toggle
              aria-label="First group"
              size="md"
              style={{ height: "34px", marginLeft: "5px" }}
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
          <Col
            sm={4}
            xs={4}
            style={{ display: "flex" }}
            className="justify-content-md-center"
          >
            <p style={{ fontSize: "larger" }}>Size: 16oz</p>
            {/*
            <ButtonGroup
              toggle
              size="sm"
              aria-label="First group"
              style={{ height: "30px", marginLeft: "5px" }}
            >
              <ToggleButton
                variant="secondary"
                onClick={() => {
                  this.setState({ size: 16 });
                  this.getPercentage();
                }}
                value={16}
                name={"s"}
                type="radio"
                checked={this.state.size == 16}
              >
                Small
              </ToggleButton>
              <ToggleButton
                variant="secondary"
                onClick={() => {
                  this.setState({ size: 20 });
                  this.getPercentage();
                }}
                value={20}
                name={"m"}
                type="radio"
                checked={this.state.size == 20}
              >
                Medium
              </ToggleButton>
              <ToggleButton
                variant="secondary"
                onClick={() => {
                  this.setState({ size: 24 });
                  this.getPercentage();
                }}
                value={24}
                name={"l"}
                type="radio"
                checked={this.state.size == 24}
              >
                Large
              </ToggleButton>
            </ButtonGroup> */}
          </Col>
        </Row>
        {/*  */}
        <Row className={" justify-content-center miniScreen"}>
          <Col md={6} sm={6} xs={5} style={{ textAlign: "center" }}>
            {" "}
            {/* Current Drink Image Jar */}
            {/* <div>{this.drinkButtons}</div>*/}
            <div className={"drinkRow"}>{drinkButtons()}</div>
            <Spring from={{ percent: 0 }} to={{ percent: 100 }}>
              {({ percent }) => (
                <div className="progress vertical ed">
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
            style={{ textAlign: "center", alignSelf: "end" }}
          >
            <div style={{ borderRadius: "6px", borderStyle: "solid" }}>
              <p>
                Cost of Drink: $
                {this.state.cost[this.state.currentDrink].toFixed(2)}
              </p>
              <div
                style={{
                  padding: "0 0 0 4px",
                  backgroundColor: "white",
                  border: "solid #eeeeee",
                  borderRadius: "15px",
                  borderColor: "black",
                  height: "auto",
                }}
              >
                <h3 style={{ fontWeight: "bold", marginBottom: "-8px" }}>
                  Nutrition Facts
                </h3>
                <p style={{ marginBottom: 0, fontSize: "small" }}>
                  1 servings per {this.state.remai} ounce
                </p>

                <div
                  style={{
                    display: "block ruby",
                    marginTop: "-8px",
                    height: "22px",
                  }}
                >
                  <p
                    style={{
                      marginBottom: 0,
                      padding: 0,
                      float: "left",
                      fontSize: "small",
                      width: "90px",
                    }}
                  >
                    Serving Size
                  </p>
                  <p
                    style={{
                      marginBottom: 0,
                      width: "36px",
                      float: "right",
                      fontSize: "small",
                    }}
                  >
                    1 oz.
                  </p>
                </div>
                <hr
                  style={{
                    marginTop: 0,
                    marginBottom: 0,
                    backgroundColor: "black",
                    width: "98%",
                    height: "5px",
                  }}
                ></hr>
                <p style={{ fontWeight: "bold", margin: 0 }}>
                  Amount per serving
                </p>
                <div style={{ margin: 0, display: "flow-root" }}>
                  <h4
                    style={{
                      fontWeight: "bold",
                      marginTop: "-8px",
                      width: "max-content",
                      float: "left",
                      marginBottom: 0,
                    }}
                  >
                    Calories
                  </h4>
                  <h3
                    style={{
                      fontWeight: "bold",
                      width: "max-content",
                      float: "right",
                      marginRight: "5px",
                      marginTop: "-12px",
                      marginBottom: 0,
                    }}
                  >
                    {this.state.drinksNutrition[this.state.currentDrink].calories}
                  </h3>
                </div>

                <hr
                  style={{
                    marginRight: "6px",
                    marginTop: 0,
                    marginBottom: 0,
                    backgroundColor: "black",
                    width: "98%",
                    height: "3px",
                  }}
                ></hr>
                <div style={{ display: "flow-root", marginRight: "8px" }}>
                  <b style={{ float: "right" }}>% Daily Value</b>
                </div>
                <hr
                  style={{
                    marginRight: "6px",
                    marginTop: 0,
                    marginBottom: 0,
                    backgroundColor: "black",
                    width: "98%",
                    height: "1px",
                  }}
                />
                <div style={{ display: "flow-root" }}>
                  <b>Total Fat</b>{" "}
                  {this.state.drinksNutrition[this.state.currentDrink].totalFat.toFixed(3)}{" "}
                  <b style={{ float: "right", marginRight: "8px" }}>
                    {/*this.getDailyValue('totalFat', this.state.drinks[this.state.currentDrink].totalFat)*/}
                    %
                  </b>
                </div>
                <hr
                  style={{
                    marginRight: "6px",
                    marginTop: 0,
                    marginBottom: 0,
                    backgroundColor: "black",
                    width: "98%",
                    height: "1px",
                  }}
                />
                <div style={{ display: "flow-root" }}>
                  <b>Total Carbohydrate</b>{" "}
                  {this.state.drinksNutrition[this.state.currentDrink].totalCarbohydrate.toFixed(3)}{" "}
                  <b style={{ float: "right", marginRight: "8px" }}>
                    {/*this.getDailyValue('totalCarbohydrate', this.state.drinks[this.state.currentDrink].totalCarbohydrate)*/}
                    %
                  </b>
                </div>
                <hr
                  style={{
                    marginRight: "6px",
                    marginTop: 0,
                    marginBottom: 0,
                    backgroundColor: "black",
                    width: "98%",
                    height: "1px",
                  }}
                />
                <div style={{ display: "flow-root" }}>
                  <p
                    style={{
                      float: "left",
                      marginLeft: "25px",
                      marginRight: "4px",
                      marginBottom: 0,
                    }}
                  >
                    Dietary Fiber
                  </p>{" "}
                  0g
                  <b style={{ float: "right", marginRight: "8px" }}>0%</b>
                </div>
                <hr
                  style={{
                    marginRight: "6px",
                    marginTop: 0,
                    marginBottom: 0,
                    backgroundColor: "black",
                    width: "98%",
                    height: "1px",
                  }}
                />
                <div style={{ display: "flow-root" }}>
                  <p
                    style={{
                      float: "left",
                      marginLeft: "25px",
                      marginRight: "4px",
                      marginBottom: 0,
                    }}
                  >
                    Sugar
                  </p>
                  {this.state.drinksNutrition[this.state.currentDrink].sugar.toFixed(3)}
                </div>
                <hr
                  style={{
                    marginRight: "6px",
                    marginTop: 0,
                    marginBottom: 0,
                    backgroundColor: "black",
                    width: "98%",
                    height: "1px",
                  }}
                />
                <div style={{ display: "flow-root" }}>
                  <b>Protein</b>{" "}
                  {this.state.drinksNutrition[this.state.currentDrink].protein.toFixed(3)}
                </div>
                <hr
                  style={{
                    marginRight: "6px",
                    marginTop: 0,
                    marginBottom: 0,
                    backgroundColor: "black",
                    width: "98%",
                    height: "8px",
                  }}
                />
                {this.state.top3[this.state.currentDrink].map((mineral) => (
                  <div style={{ display: "flow-root" }}>
                    <p
                      style={{
                        float: "left",
                        marginLeft: "1px",
                        marginBottom: 0,
                      }}
                    >
                      {mineral[0]} {mineral[1]}
                    </p>
                    <p
                      style={{
                        float: "right",
                        marginRight: "8px",
                        marginBottom: 0,
                      }}
                    >
                      {Math.round(mineral[1] * 100)}%
                    </p>
                  </div>
                ))}
                <button
                  style={{
                    position: "absolute",
                    right: 0,
                    backgroundColor: "transparent",
                    border: "transparent",
                  }}
                  // onClick={() => this.flipCard(index)}
                >
                  {/*<img width="40px" height="40px" src={flip}></img>*/}
                </button>
                {/* size for the button being absolute in position*/}
              </div>
            </div>
            {this.state.nextPageReady && (
              <Button
                variant="success"
                onClick={this.checkout}
                /* to={{
                    pathname: "/checkout",
                    state: {
                      drinks: this.state.drinks,
                      cost: this.state.cost,
                      sizeOfOrder: this.state.sizeOfOrder,
                      color: this.state.colors,
                    },
                  }} */
              >
                Checkout
              </Button>
            )}
          </Col>
        </Row>

        <br />
        <Row className="justify-content-center ">
          <Col>
            <Container>
              <Row className="row justify-content-between">
                <Col
                  style={{ paddingTop: "5px", borderRadius: "7px" }}
                  className="remainingOunces"
                  id="remainingOunces"
                >
                  Remaining Ounces:{" "}
                  {this.state.size - this.state.ounces[this.state.currentDrink]}
                </Col>
                <Col className="col-2">
                  <Button
                    id="clearButton"
                    style={{
                      padding: ".1rem .4rem",
                      float: "right",
                      borderRadius: "7px",
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
                      float: "right",
                      borderRadius: "7px",
                    }}
                    onClick={this.scrollToTop}
                  >
                    ⬆
                  </Button>
                </Col>
              </Row>
              <Row>{listItems(this.state.currentDrink)}</Row>
            </Container>
            <br />
            <Container fluid="md">{this.madeDrinks()}</Container>
          </Col>
          <Col sm={4} xs={12} id="right-side">
            <div style={{ position: "sticky", top: "60px" }}>
              <Row className="justify-content-center">
                {" "}
                {/* Current Drink Image Jar */}
                {/* <div>{this.drinkButtons}</div>*/}
                <div className={"drinkRow"}>{drinkButtons()}</div>
              </Row>
              <Row className="justify-content-center">
                <Spring from={{ percent: 0 }} to={{ percent: 100 }}>
                  {({ percent }) => (
                    <div className="progress vertical ed">
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
                  style={{ border: "none", padding: 0 }}
                >
                  <div
                    style={{
                      padding: "0 0 0 4px",
                      backgroundColor: "white",
                      border: "solid #eeeeee",
                      borderRadius: "15px",
                      borderColor: "black",
                      height: "auto",
                    }}
                  >
                    <h3 style={{ fontWeight: "bold", marginBottom: "-8px" }}>
                      Nutrition Facts
                    </h3>
                    <p style={{ marginBottom: 0, fontSize: "small" }}>
                      1 servings per 16 ounce
                    </p>

                    <div
                      style={{
                        display: "block ruby",
                        marginTop: "-8px",
                        height: "22px",
                      }}
                    >
                      <p
                        style={{
                          marginBottom: 0,
                          padding: 0,
                          float: "left",
                          fontSize: "small",
                          width: "90px",
                        }}
                      >
                        Serving Size
                      </p>
                      <p
                        style={{
                          marginBottom: 0,
                          width: "36px",
                          float: "right",
                          fontSize: "small",
                        }}
                      >
                        {this.state.ounces[this.state.currentDrink]} oz.
                      </p>
                    </div>
                    <hr
                      style={{
                        marginTop: 0,
                        marginBottom: 0,
                        backgroundColor: "black",
                        width: "98%",
                        height: "5px",
                      }}
                    ></hr>
                    <p style={{ fontWeight: "bold", margin: 0 }}>
                      Amount per serving
                    </p>
                    <div style={{ margin: 0, display: "flow-root" }}>
                      <h4
                        style={{
                          fontWeight: "bold",
                          marginTop: "-8px",
                          width: "max-content",
                          float: "left",
                          marginBottom: 0,
                        }}
                      >
                        Calories
                      </h4>
                      <h3
                        style={{
                          fontWeight: "bold",
                          width: "max-content",
                          float: "right",
                          marginRight: "5px",
                          marginTop: "-12px",
                          marginBottom: 0,
                        }}
                      >
                        {
                          this.state.drinksNutrition[this.state.currentDrink][
                            "calories"
                          ]
                        }
                      </h3>
                    </div>

                    <hr
                      style={{
                        marginRight: "6px",
                        marginTop: 0,
                        marginBottom: 0,
                        backgroundColor: "black",
                        width: "98%",
                        height: "3px",
                      }}
                    ></hr>
                    <div style={{ display: "flow-root", marginRight: "8px" }}>
                      <b style={{ float: "right" }}>% Daily Value</b>
                    </div>
                    <hr
                      style={{
                        marginRight: "6px",
                        marginTop: 0,
                        marginBottom: 0,
                        backgroundColor: "black",
                        width: "98%",
                        height: "1px",
                      }}
                    />
                    <div style={{ display: "flow-root" }}>
                      <b>Total Fat</b>{" "}
                      {
                        this.state.drinksNutrition[this.state.currentDrink][
                          "totalFat"
                        ].toFixed(3)
                      }
                      {"g"}
                      <b style={{ float: "right", marginRight: "8px" }}> %</b>
                    </div>
                    <hr
                      style={{
                        marginRight: "6px",
                        marginTop: 0,
                        marginBottom: 0,
                        backgroundColor: "black",
                        width: "98%",
                        height: "1px",
                      }}
                    />
                    <div style={{ display: "flow-root" }}>
                      <b>Total Carbohydrate</b>{" "}
                      {
                        this.state.drinksNutrition[this.state.currentDrink][
                          "totalCarbohydrate"
                        ].toFixed(3)
                      }
                      {"g"}
                      <b style={{ float: "right", marginRight: "8px" }}> %</b>
                    </div>
                    <hr
                      style={{
                        marginRight: "6px",
                        marginTop: 0,
                        marginBottom: 0,
                        backgroundColor: "black",
                        width: "98%",
                        height: "1px",
                      }}
                    />
                    <div style={{ display: "flow-root" }}>
                      <p
                        style={{
                          float: "left",
                          marginLeft: "25px",
                          marginRight: "4px",
                          marginBottom: 0,
                        }}
                      >
                        Dietary Fiber
                      </p>{" "}
                      0g
                      <b style={{ float: "right", marginRight: "8px" }}>0%</b>
                    </div>
                    <hr
                      style={{
                        marginRight: "6px",
                        marginTop: 0,
                        marginBottom: 0,
                        backgroundColor: "black",
                        width: "98%",
                        height: "1px",
                      }}
                    />
                    <div style={{ display: "flow-root" }}>
                      <p
                        style={{
                          float: "left",
                          marginLeft: "25px",
                          marginRight: "4px",
                          marginBottom: 0,
                        }}
                      >
                        Sugar{" "}
                        {
                          this.state.drinksNutrition[this.state.currentDrink][
                            "sugar"
                          ].toFixed(3)
                        }
                        {"g"}
                      </p>
                    </div>
                    <hr
                      style={{
                        marginRight: "6px",
                        marginTop: 0,
                        marginBottom: 0,
                        backgroundColor: "black",
                        width: "98%",
                        height: "1px",
                      }}
                    />
                    <div style={{ display: "flow-root" }}>
                      <b>Protein</b>{" "}
                      {
                        this.state.drinksNutrition[this.state.currentDrink][
                          "protein"
                        ].toFixed(3)
                      }
                      {"g"}
                    </div>
                    <hr
                      style={{
                        marginRight: "6px",
                        marginTop: 0,
                        marginBottom: 0,
                        backgroundColor: "black",
                        width: "98%",
                        height: "8px",
                      }}
                    />
                    {this.state.top3[this.state.currentDrink].map((mineral, i) => (
                      <div style={{ display: "flow-root" }} key={i}>
                        <p
                          style={{
                            float: "left",
                            marginLeft: "1px",
                            marginBottom: 0,
                          }}
                        >
                          {capitalizeFirstLetter(mineral[0])}{" "}
                          {this.state.drinksNutrition[this.state.currentDrink][mineral[0]].toFixed(3)}{"mg"}
                        </p>
                        <p
                          style={{
                            float: "right",
                            marginRight: "8px",
                            marginBottom: 0,
                          }}
                        >
                          {mineral[1].toFixed(2)}%
                        </p>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
              <Row
                className="justify-content-center"
                style={{ marginTop: "10px" }}
              >
                <Col
                  className="col-lg-9 col-md-10 col-sm-12"
                  style={{ borderRadius: "6px", borderStyle: "solid" }}
                >
                  <p>
                    Cost of Drink: $
                    {this.state.cost[this.state.currentDrink].toFixed(2)}
                  </p>
                  <p>Total: ${total.toFixed(2)}</p>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col className="col-auto" style={{ marginTop: "10px" }}>
                  {this.state.nextPageReady && (
                    <Button
                      variant="success"
                      onClick={this.checkout}
                      /* to={{
                    pathname: "/checkout",
                    state: {
                      drinks: this.state.drinks,
                      cost: this.state.cost,
                      sizeOfOrder: this.state.sizeOfOrder,
                      color: this.state.colors,
                    },
                  }} */
                    >
                      Checkout
                    </Button>
                  )}
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
