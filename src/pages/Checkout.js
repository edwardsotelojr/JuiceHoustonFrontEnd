import { Check } from "@material-ui/icons";
import { arrayOf } from "prop-types";
import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Boxable from "../components/Boxable";
import Box from "../components/Box";
import "./DragThingsToBoxesDemo.css";
class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.location.state,
      selectedDates: [],
      name: "",
      email: "",
      phone: 0,
      address: "",
      zipcode: 0,
    };
    this.selectDay = this.selectDay.bind(this);
    this.daysAvailable = this.daysAvailable.bind(this);
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    // if hour is 18, next day delivery is unavailable
    this.daysAvailable();
  }

  daysAvailable() {
    var dat = new Date(); // current time
    var first = dat.getDate();
    var objectOfDays = {};
    var arrayOfDays = [];

    const hour = dat.getHours();
    if (hour < 18) {
      //not available next day
      for (var i = 1; i <= 7; i++) {
        var next = new Date(dat.getTime());
        next.setDate(first + i);
        objectOfDays[next.toString()] = {};

        arrayOfDays.push(next.toString().slice(0, 15));
      }
    } else {
      for (var i = 2; i <= 8; i++) {
        var next = new Date(dat.getTime());
        next.setDate(first + i);
        objectOfDays[next.toString()] = {};
        arrayOfDays.push(next.toString().slice(0, 15));
      }
    }
    this.setState({ objectOfDays, arrayOfDays });
  }

  listIngredients(drink) {
    const list = Object.keys(drink).map((p, index) => {
      if (drink[p] > 0) {
        return (
          <div key={index}>
            <p key={index}>
              {p}: {drink[p]}oz.
            </p>
          </div>
        );
      }
    });
    return list;
  }

  selectDay(event) {
    console.log(event.target);
    let selectedDates = [...this.state.selectedDates];
    // 2. Make a shallow copy of the item you want to mutate
    let index = parseInt(event.target.name);
    // 3. Replace the property you're intested in
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    selectedDates[index] = event.target.value;
    // 5. Set the state to our new copy
    this.setState({ selectedDates });
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <Container fluid style={{ marginTop: "60px" }}>
        <Row>
          <Col>
            <button>Login </button>
            <p>Sign Up for future quicker checkout</p>
          </Col>
        </Row>
        <Row>
          {this.state.data.drinks
            .slice(0, this.state.data.sizeOfOrder)
            .map((drink, index) => (
              <div
                key={index}
                style={{ borderStyle: "solid", borderRadius: "20px" }}
              >
                <p>Drink {index + 1}</p>
                {this.listIngredients(drink)}
                <select
                  name={index}
                  value={this.state.selectedDates[index]}
                  onChange={this.selectDay}
                >
                  {this.state.arrayOfDays ? (
                    this.state.arrayOfDays.map((date, index) => (
                      <option key={index} value={date}>
                        {date}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
                <div>
                  {this.state.selectedDates[index]} {/* date selected */}
                </div>
              </div>
            ))}
        </Row>

        <Row>
          <Col sm={4}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={this.onChange} name="name" type="name" placeholder="Enter name" />
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" />
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" name="phone" placeholder="Enter phone" />
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" placeholder="Enter address" />
            <Form.Label>zipcode</Form.Label>
            <Form.Control type="number" name="zipcode" placeholder="Enter zipcode" />
          </Form.Group>
          </Col>
          {/*     <div className="things_to_drag">
            
          <Boxable targetKey="box" label="bananas"  image="img/banana.png"/>
          <Boxable targetKey="box" label="cheeseburger"  image="img/surprise.png"/>
          <Boxable targetKey="box" label="orange" image="img/orange.png"/>
          <Boxable targetKey="box" label="pickle" image="img/pickle.png"/>
          <Boxable targetKey="box" label="gorilla" image="img/gorilla.png"/>
          <Boxable targetKey="box" label="puppy" image="img/puppy.png"/>
        </div> */}
        </Row>
      </Container>
    );
  }
}

export default Checkout;
