import React, { Component } from "react";
import list from "../MenuList";
import mlist from "../madeDrinks";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  InputGroup,
} from "react-bootstrap";
import { Spring } from "react-spring";
import mixColors from "mix-colors";
import {Link} from 'react-router-dom'
import listo from "../listo.js";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeOfOrder: 3, // number of drinks
      drinks: [listo, listo, listo, listo, listo],
      ounces: [0, 0, 0, 0, 0], // max is 18  oz
      size: 20, // sm: 16, md: 20, lg: 24
      currentDrink: 0,
      percentages: [0, 0, 0, 0, 0],
      colors: ["", "", "", "", ""],
      cost: [0, 0, 0, 0, 0],
      vitamins: [{}, {}, {}, {}, {}],
      calories: [0, 0, 0, 0, 0],
      nextPageReady: false,
      drinkNames: ["", "", "", "", ""],
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
  }

  checkout(){
    //window.location.href='/checkout'
    this.props.history.push({
      pathname:"/checkout",
      state:{
          drinks: this.state.drinks,
          cost: this.state.cost,
          sizeOfOrder: this.state.sizeOfOrder,
          color: this.state.colors
       }
     });
  }
  
  clearDrink(){
    var drinks = [...this.state.drinks];
    var drink = {...drinks[this.state.currentDrink]}
    for (var p in drink) {
      drink[p] = 0;
    }
    drinks[this.state.currentDrink] = drink;
    this.setState(
      {
        drinks: drinks,
      },() => {
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
    var drink = {...drinks[this.state.currentDrink]}
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
      },() => {
        this.getPercentage();
        this.color();
        this.getVitamins();
        this.getCost();
        this.getCalories();
      }
    );
   
  }

  nextPage(percentages) {
    console.log("nextpage");
    const sizeOfOrder = this.state.sizeOfOrder;
    const slicedDrinksPercentage = percentages.slice(0, sizeOfOrder);
    console.log(slicedDrinksPercentage, " ", slicedDrinksPercentage.some(p => p < 100))

    if(  slicedDrinksPercentage.some(p => p < 100)){
        return this.setState({ nextPageReady: false });
      }
      else{
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
          if (list[produce].name == p) {
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
          if (list[produce].name == p) {
            // if item equal produce name
            //cost = cost + (list[produce].costPerOunce * this.state.drinks[this.state.currentDrink][p]); // push color of produce ounce
            for (const a in list[produce].vitamin) {
              //console.log(a); /// HERE
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
    this.setState({ ounces: newOunces, percentages: copyOfPercent },() => this.nextPage(copyOfPercent)); //set the new state
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

  // change drink property
  onChange = (e) => {
    const value = e.target.value.replace(/^0+/, "");
    let st = [...this.state.drinks];
    if (value == undefined || value == "") {
      // if value is nil
      st[this.state.currentDrink] = {
        ...st[this.state.currentDrink],
        [e.target.name]: 0,
      };
      return this.setState({ drinks: st },() => {
        this.getPercentage();
        this.color();
        this.getVitamins();
        this.getCost();
        this.getCalories();
      });
    }
    else if (
      this.state.percentages[this.state.currentDrink] == 100 && // if drink is full
      value > this.state.drinks[this.state.currentDrink][e.target.name]
    ) {
      // and value is higher than previous value
      return;
    }
    else if (value >= 0 && value <= this.state.size) {
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
        {item.name} {drinksPercentage[index]}%
      </p>
    ));
    return <div>{dr}</div>;
  }

  madeDrinks = () => {
    // var calorie = produceInDrink[0].calories * this.state.size * (50/100)
    return mlist.map((drink, index) => (
      <Row key="d" style={{ borderColor: "light green", borderStyle: "solid" }}>
        <Col>
          <h1>{drink.name}</h1>
          {this.getIngredients(drink.content)}
        </Col>
        <Col sm={1}>
          <button
            onClick={() => this.madeDrinkSelected(drink.content)}
          ></button>
        </Col>
      </Row>
    ));
  };

  render() {
    const juiceCup = (percent, c) => ({
      height: `${percent}%`,
      backgroundColor: c,
    });
    const drinkButtons = () => {
      const colors = this.state.colors;
      const percentages = this.state.percentages;
      const l = percentages.slice(0, this.state.sizeOfOrder);
      var i = 0;
      const listItems = l.map((percent, index) => (
        <label key={index} style={{ display: "inline-grid", margin: "4px" }}>
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
                className="progress vertical"
                style={{ height: "40px", width: "40px" }}
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
      return <div>{listItems}</div>;
    };
    const produceFacts = (facts) => {
      facts.map((fact) => <h1>{fact}</h1>);
    };

    var listItems = (curentDrink) =>
      list.map((item, index) => (
        <Row
          className="d-flex align-items-center justify-content-between"
          key={index}
          style={{ borderColor: "red", borderStyle: "solid" }}
        >
          <Col>
            <h3>{item.name}</h3>
            {produceFacts(item.facts)}
          </Col>
          <Col sm={3} className="col-auto">
            <input
              type="number"
              min={0}
              max={this.state.size}
              id={item.name}
              name={item.name}
              style={{ width: "50px", float: "right", borderRadius: "5px" }}
              value={this.state.drinks[curentDrink][item.name]}
              onChange={this.onChange}
              onKeyDown={this.handleKeyPress}
            ></input>
            <p
              style={{
                float: "right",
              }}
            >
              {item.costPerOunce * 100}¢/oz.
            </p>
          </Col>
        </Row>
      ));

    return (
      <Container fluid style={{ marginTop: "60px", backgroundColor: "grey" }}>
        <Row className="justify-content-md-center">
          <Col
            sm={4}
            style={{ display: "flex" }}
            className="justify-content-md-center"
          >
            <p style={{ fontSize: "larger" }}>Amount of Drinks:</p>
            <ButtonGroup
              name="d"
              toggle
              aria-label="First group"
              size="sm"
              style={{ height: "30px", marginLeft: "5px" }}
            >
              <ToggleButton
                name="3"
                variant="secondary"
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
                variant="secondary"
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
                variant="secondary"
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
            style={{ display: "flex" }}
            className="justify-content-md-center"
          >
            <p style={{ fontSize: "larger" }}>Size:</p>
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
            </ButtonGroup>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col sm={6}></Col>
        </Row>
        <br />
        <Row className="justify-content-center ">
          <Col>
            <Container>
              <Row>
                <Col>
                Remaining Ounces:{" "}
                {this.state.size - this.state.ounces[this.state.currentDrink]}
                </Col>
                <Col>
                <button onClick={this.clearDrink}>Clear</button>
                </Col>
              </Row>
              {listItems(this.state.currentDrink)}
            </Container>

            {this.madeDrinks()}
          </Col>
          <Col sm={4} xs={12}>
            <Row className="justify-content-center">
              {" "}
              {/* Current Drink Image Jar */}
              {/* <div>{this.drinkButtons}</div>*/}
              <div>{drinkButtons()}</div>
            </Row>
            <Row className="justify-content-center">
              <Spring from={{ percent: 0 }} to={{ percent: 100 }}>
                {({ percent }) => (
                  <div className="progress vertical">
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

            <Row className="justify-content-center">
              <Col style={{ borderRadius: "3px", borderStyle: "solid" }}>
                <p>
                  Cost for Drink: $
                  {this.state.cost[this.state.currentDrink].toPrecision(2)}
                </p>
                <br />
                <p>
                  Calories for Drink: 
                  {" "+this.state.calories[this.state.currentDrink]}
                </p>
              </Col>
            </Row>
            <Row>{this.state.nextPageReady && <Link
  to={{
    pathname: "/checkout",
    state: { drinks: this.state.drinks,
      cost: this.state.cost,
      sizeOfOrder: this.state.sizeOfOrder,
      color: this.state.colors }
  }}
>Next Page</Link>}</Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Order;
