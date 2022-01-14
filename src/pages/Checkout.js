import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Card,
  Col,
  Form,
  Button,
  Popover,
  Overlay,
  Fade,
  Alert,
} from "react-bootstrap";
import "./DragThingsToBoxesDemo.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import geocoder from "google-geocoder";
import zipcodes from "../zipcode";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    const drinks = [];
    for (var i = 0; i < props.location.state.sizeOfOrder; i++) {
      drinks[i] = {
        id: "Juice" + (i + 1),
        content: "Juice " + (i + 1),
        ingredients: props.location.state.drinks[i],
      };
    }
    this.state = {
      loginButtonPressed: false,
      sizeOfOrder: props.location.state.sizeOfOrder,
      drinks: props.location.state.drinks,
      colors: props.location.state.color,
      prices: props.location.state.cost,
      drinksNutrition: props.location.state.drinksNutrition,
      columns: {
        ["Dates"]: {
          name: "Juices",
          items: drinks,
        },
        day1: {
          name: "",
          items: [],
        },
        day2: {
          name: "",
          items: [],
        },
        day3: {
          name: "",
          items: [],
        },
        day4: {
          name: "",
          items: [],
        },
        day5: {
          name: "",
          items: [],
        },
        day6: {
          name: "",
          items: [],
        },
        day7: {
          name: "",
          items: [],
        },
      },
      data: this.props.location.state,
      deliveryDates: ["", "", "", "", ""],
      name: "",
      email: "",
      emaill: "",
      password: "",
      phone: null,
      address: "",
      zipcode: null,
      gateCode: "",
      suiteNumber: "",
      instructions: "",
      agreement: false,
      totalCost: props.location.state.totalCost,
      nameValid: false,
      emailValid: false,
      phoneValid: false,
      addressValid: false,
      zipcodeValid: false,
      suiteNumberValid: true,
      gateCodeValid: true,
      instructionsValid: true,

      nameBorder: {},
      emailBorder: {},
      phoneBorder: {},
      addressBorder: {},
      zipcodeBorder: {},
      suiteNumberBorder: {},
      gateCodeBorder: {},
      agreementBorder: {},
      instructionsBorder: {},

      placeOrderReady: false
    };

    this.nameTarget = React.createRef();
    this.emailTarget = React.createRef();
    this.phoneTarget = React.createRef();
    this.addressTarget = React.createRef();
    this.zipcodeTarget = React.createRef();
    this.suiteNumberTarget = React.createRef();
    this.gateCodeTarget = React.createRef();
    this.agreementTarget = React.createRef();
    this.instructionsTarget = React.createRef();

    this.selectedDay = this.selectedDay.bind(this);
    this.daysAvailable = this.daysAvailable.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.placeOrderReady = this.placeOrderReady.bind(this);
  }

  handleLogin = (e) => {
    e.preventDefault();
    var user = { email: this.state.emaill, password: this.state.password };
    axios.post("http://localhost:8000/login", user).then((res) => {
      this.setState({
        name: res.data.user.name,
        email: res.data.user.email,
        address: res.data.user.address,
        zipcode: res.data.user.zipcode,
        phone: res.data.user.phone,
        instructions: res.data.user.instructions,
        gateCode: res.data.user.gateCode,
        suiteNumber: res.data.user.suiteNumber,
      });
      document.getElementById("siginForm").style.display = "none";
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const drinks = [];
    for (var i = 0; i < this.state.sizeOfOrder; i++) {
      drinks[i] = {
        ingredients: this.state.drinks[i],
        deliveryDate: this.state.deliveryDates[i],
        color: this.state.colors[i],
        price: this.state.prices[i],
        nutritionalFacts: this.state.drinksNutrition[i],
      };
    }
    const order = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      zipcode: this.state.zipcode,
      gateCode: this.state.gateCode,
      suiteNumber: this.state.suiteNumber,
      instructions: this.state.instructions,
      sizeOfOrder: this.state.sizeOfOrder,
      agreement: this.state.agreement,
      totalCost: this.state.totalCost,
      drinks: drinks,
    };
    console.log(order)
    this.props.placeOrder(order)
  };

  validation = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    var valid = false;
    var border = { borderColor: "red" };
    switch (name) {
      case "name":
        valid = value.length >= 1 && value.length < 20;
        if (valid) border = {}
        else{
          valid = false
        }
        break;
      case "email":
        if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          valid = true;
          border = {};
        }else{
          valid = false
        }
        break;
      case "phone":
        if (value.length == 10) {
          valid = true;
          border = {};
        }else{
          valid = false
        }
        break;
        case "address":
            valid = true;
            border = {};
            break;
        break;
      case "zipcode":
        for (var z in zipcodes) {
          if (zipcodes[z] == Number(value)) {
            valid = true;
            border = {};
            break;
          }else{
            valid = false
          }
        }
        break;
      case "instructions":
        valid = value.length >= 0 && value.length < 200;
        if (valid){border = {}}
        else{ valid = false}
        break;
      case "gateCode":
        valid = value.length >= 0 && value.length < 10;
        if (valid) border = {}
        else{ valid = false}
        break;
      case "suiteNumber":
        valid = value.length >= 0 && value.length < 10;
        if (valid) border = {}
        else{ valid = false}
        break;
      default:
        break;
    }
    this.setState(
      {
        [e.target.name + "Valid"]: valid,
        [e.target.name + "Border"]: border,
      },
      () => {
        this.placeOrderReady();
      }
    );
  };

  componentDidMount() {
    // if hour is 18, next day delivery is unavailable
    this.daysAvailable();
  }

  daysAvailable = () => {
    var dat = new Date(); // current time
    var first = dat.getDate();
    var arrayOfDays = [];
    const hour = dat.getHours();
    if (hour < 18) {
      //not available next day
      for (var i = 1; i <= 7; i++) {
        var next = new Date(dat.getTime());
        next.setDate(first + i);
        arrayOfDays.push(next.toString().slice(0, 15));
      }
    } else {
      for (var i = 2; i <= 8; i++) {
        var next = new Date(dat.getTime());
        next.setDate(first + i);
        arrayOfDays.push(next.toString().slice(0, 15));
      }
    }
    var i = 0;
    this.setState({ arrayOfDays });
    Object.entries(this.state.columns).forEach(([key, value]) => {
      if (key === "Dates") {
        return;
      }
      this.setState((prevState) => ({
        ...prevState,
        columns: {
          ...prevState.columns, // copy all other key-value pairs of food object
          [key]: {
            //...prevState[columns][day],
            // specific object of food object
            name: arrayOfDays[i++], // update value of specific key
            items: [],
          },
        },
      }));
    });
  };

  listIngredients(drink) {
    const list = Object.keys(drink).map((p, index) => {
      if (drink[p] > 0) {
        return (
          <p key={index} style={{ marginBottom: ".3rem" }} key={index}>
            {p}: {drink[p]}oz.
          </p>
        );
      }
    });
    return list;
  }

  selectedDay(event) {
    // if date is already in array, return
    if (this.state.selectedDates.includes(event.target.value)) {
      return;
    }
    let selectedDates = [...this.state.selectedDates];
    // 2. Make a shallow copy of the item you want to mutate
    let index = parseInt(event.target.id);
    // 3. Replace the property you're intested in
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    selectedDates[index] = event.target.value;
    // 5. Set the state to our new copy
    this.setState({ selectedDates });
  }

  onChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      }
    );

    const name = e.target.name + "Border"
    if(this.state[name] == {}){
      console.log("empty")
    }
  }

  componentDidUpdate() {
    this.placeOrderReady();
  }

  placeOrderReady = () => {
    if (this.state.columns.Dates.items.length != 0) {
      return;
    }
    console.log("here in placeorderready")
    const {
      agreement,
      nameValid,
      emailValid,
      phoneValid,
      addressValid,
      zipcodeValid,
      suiteNumberValid,
      gateCodeValid,
      instructionsValid,
    } = this.state;
    if (
      agreement &&
      nameValid &&
      emailValid &&
      phoneValid &&
      addressValid &&
      zipcodeValid &&
      suiteNumberValid &&
      gateCodeValid &&
      instructionsValid
    ) {
      console.log("ready ");
      if(!this.state.placeOrderReady)
      this.setState({placeOrderReady: true})
    }else{
      if(this.state.placeOrderReady != false)
      this.setState({placeOrderReady: false})
    }
  };

  onDragEnd = (result, columns) => {
    console.log(result);
    if (!result.destination) return;
    const { source, destination } = result;
    if (
      destination.droppableId != "Dates" &&
      columns[destination.droppableId].items.length == 1
    ) {
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      const juiceNumber = parseInt(result.draggableId[5]);
      console.log(juiceNumber);
      const deliveryDate = columns[destination.droppableId].name;
      var deliveryDates = [...this.state.deliveryDates];
      deliveryDates[juiceNumber - 1] = deliveryDate;
      this.setState((prevState) => ({
        columns: {
          ...prevState.columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        },
        deliveryDates: deliveryDates,
      }));
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      this.setState({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  render() {
    const stripePromise = loadStripe(
      "pk_test_51JdrbbJhLWcBt73zLaa0UNkmKAAonyh9sRyrmkaMUgufzOeuvL4Vu9cNJcfdGykBSxkQPJOWkICvYoqw3r7q0AzD00Trf0E3aP"
    );

    const renderIngredients = (ingredients) => {
      var d = [];
      for (const [key, value] of Object.entries(ingredients)) {
        d.push(
          <p style={{ marginBottom: 0 }}>
            {key}: {value}oz.
          </p>
        );
      }
      return d;
    };

    return (
      <Container
        fluid
        style={{ marginTop: "50px", backgroundColor: "rgb(255, 255, 240)" }}
      >
        <br />
        <Row>
          <DragDropContext
            onDragEnd={(result) => this.onDragEnd(result, this.state.columns)}
          >
            {Object.entries(this.state.columns).map(
              ([columnId, column], index) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    key={columnId}
                  >
                    <p style={{ marginBottom: 0 }}>{column.name}</p>
                    <div style={{ margin: 8 }}>
                      <Droppable
                        droppableId={columnId}
                        key={columnId}
                        direction="horizontal"
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                display: "flex",
                                background: snapshot.isDraggingOver
                                  ? "lightblue"
                                  : "lightgrey",
                                padding: 4,
                                minWidth: 160,
                                minHeight: 80,
                              }}
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelect: "none",
                                            padding: 5,
                                            margin: "1px 3px 1px 3px",
                                            minHeight: "50px",
                                            backgroundColor: snapshot.isDragging
                                              ? "#263B4A"
                                              : "#456C86",
                                            color: "white",
                                            ...provided.draggableProps.style,
                                          }}
                                        >
                                          {item.content}
                                          {renderIngredients(item.ingredients)}
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          );
                        }}
                      </Droppable>
                    </div>
                  </div>
                );
              }
            )}
          </DragDropContext>
        </Row>
        <Row>
          {Object.keys(this.props.user).length == 0 ? (
            <Col>
              {this.state.loginButtonPressed ? (
                <div>
                  <Form
                    onSubmit={this.handleLogin}
                    style={{
                      width: "max-content",
                      padding: "1px 15px 1px 15px",
                    }}
                    id={"siginForm"}
                  >
                    {this.props.error ? (
                      <Alert style={{ marginBottom: 0 }} variant={"danger"}>
                        {this.props.error.response.data.msg}
                      </Alert>
                    ) : null}
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        value={this.state.emaill}
                        onChange={(e) => {
                          e.stopPropagation();
                          this.setState({ emaill: e.target.value });
                        }}
                        type="email"
                        placeholder="Enter email"
                      />
                    </Form.Group>

                    <Form.Group
                      controlId="formBasicPassword"
                      style={{ marginBottom: "0.5rem" }}
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        value={this.state.password}
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                    <input
                      type="submit"
                      value="login"
                      style={{
                        borderRadius: "4px",
                        padding: "7px",
                        backgroundColor: "#9bd16e",
                      }}
                    />
                  </Form>
                </div>
              ) : (
                <div>
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={() => this.setState({ loginButtonPressed: true })}
                  >
                    Login{" "}
                  </Button>
                  Login for quicker checkout
                </div>
              )}
            </Col>
          ) : null}
        </Row>

        <Row>
          <Col sm={4}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onBlur={this.validation}
                ref={this.nameTarget}
                onChange={this.onChange}
                value={this.state.name}
                name="name"
                type="text"
                style={this.state.nameBorder}
                placeholder="Enter name"
              />
              <Overlay
                transition={Fade}
                target={this.nameTarget.current}
                show={Object.entries(this.state.nameBorder).length === 1}
                placement="top"
              >
                <Popover
                  id="popover-contained"
                  style={{ padding: "3px 5px 3px 5px" }}
                >
                  between 1 and 20 characters
                </Popover>
              </Overlay>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                ref={this.emailTarget}
                type="email"
                onChange={this.onChange}
                value={this.state.email}
                name="email"
                placeholder="Enter email"
                onBlur={this.validation}
                style={this.state.emailBorder}
              />
              <Overlay
                transition={Fade}
                target={this.emailTarget.current}
                show={Object.entries(this.state.emailBorder).length === 1}
                placement="top"
              >
                <Popover
                  id="popover-contained"
                  style={{ padding: "3px 5px 3px 5px" }}
                >
                  invalid email
                </Popover>
              </Overlay>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                ref={this.phoneTarget}
                onBlur={this.validation}
                onChange={this.onChange}
                style={this.state.phoneBorder}
                type="tel"
                value={this.state.phone}
                name="phone"
                placeholder="Enter phone"
              />
              <Overlay
                transition={Fade}
                target={this.phoneTarget.current}
                show={Object.entries(this.state.phoneBorder).length === 1}
                placement="top"
              >
                <Popover
                  id="popover-contained"
                  style={{ padding: "5px 5px 0px 5px" }}
                >
                  <p> phone number is not valid. </p>
                </Popover>
              </Overlay>
              <Form.Label>Address</Form.Label>
              <Form.Control
                onBlur={this.validation}
                onChange={this.onChange}
                type="text"
                ref={this.addressTarget}
                style={this.state.addressBorder}
                value={this.state.address}
                name="address"
                placeholder="Enter address"
              />
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                onChange={this.onChange}
                type="number"
                name="zipcode"
                onBlur={this.validation}
                defaultValue={this.props.user.zipcode}
                placeholder="Enter zipcode"
                ref={this.zipcodeTarget}
                style={this.state.zipcodeBorder}
                value={this.state.zipcode}
              />
              <Overlay
                transition={Fade}
                target={this.zipcodeTarget.current}
                show={Object.entries(this.state.zipcodeBorder).length === 1}
                placement="top"
              >
                <Popover
                  id="popover-contained"
                  style={{ padding: "3px 5px 3px 5px" }}
                >
                  zipcode outside of delivery range.
                </Popover>
              </Overlay>
            </Form.Group>
            <Form.Label>Gate Code</Form.Label>
            <Form.Control
              onBlur={this.validation}
              onChange={this.onChange}
              ref={this.gateCodeTarget}
              value={this.state.gateCode}
              name="gateCode"
              type="text"
              style={this.state.gateCodeBorder}
              placeholder="Enter gate code (optional)"
            />
            <Overlay
              transition={Fade}
              target={this.gateCodeTarget.current}
              show={Object.entries(this.state.gateCodeBorder).length === 1}
              placement="top"
            >
              <Popover
                id="popover-contained"
                style={{ padding: "3px 5px 3px 5px" }}
              >
                Gate code cant be this long dawg.
              </Popover>
            </Overlay>
            <Form.Label>Suite Number</Form.Label>
            <Form.Control
              onBlur={this.validation}
              ref={this.suiteNumberTarget}
              onChange={this.onChange}
              name="suiteNumber"
              type="text"
              value={this.state.suiteNumber}
              style={this.state.suiteNumberBorder}
              placeholder="Enter Suite Number (optional)"
            />
            <Overlay
              transition={Fade}
              target={this.suiteNumberTarget.current}
              show={Object.entries(this.state.suiteNumberBorder).length === 1}
              placement="top"
            >
              <Popover
                id="popover-contained"
                style={{ padding: "3px 5px 3px 5px" }}
              >
                Suite Number not real.
              </Popover>
            </Overlay>
            <div style={{ height: "20px" }}></div>
          </Col>
          <Col>
            <div style={{ height: "7px" }} />
            <Elements stripe={stripePromise}>
              <CardElement />
            </Elements>
            <Form.Label>Instructions</Form.Label>
            <Form.Control
              onBlur={this.validation}
              onChange={this.onChange}
              as="textarea"
              name="instructions"
              rows={2}
              style={{ marginBottom: "10px" }}
              value={this.state.instructions}
              placeholder="optional"
            />
            <Overlay
              transition={Fade}
              target={this.instructionsTarget.current}
              show={Object.entries(this.state.instructionsBorder).length === 1}
              placement="top"
            >
              <Popover
                id="popover-contained"
                style={{ padding: "5px 5px 0px 5px" }}
              >
                <p> instructions too long for database. wtf </p>
              </Popover>
            </Overlay>
            <Card>
              <Card.Body>
                <Card.Title>Order Agreement</Card.Title>
                <Card.Text>
                  All Sales are final. You are allow to change the delivery date
                  for a juice before 6pm the day before previously schedule
                  date. Juices are prepared the night before delivery, with
                  fresh washed produce. The Juicer is cleaned before every juice
                  is made. No cross contamination. The person making the juice
                  is always a mask and gloves on. The juices are refrigerated
                  upon delivery. Fresh Juices are meant to be consumed the day
                  of delivery. Juices are placed in an shaded area when
                  delivered, minding the duration of the shaded area. Please
                  recycle the bottle with the cap off. Thank you.
                </Card.Text>
              </Card.Body>
            </Card>
            <Form.Group
              controlId="formBasicCheckbox"
              style={{ marginBottom: "7px" }}
            >
              <Form.Check
                type="checkbox"
                label="I read and understand the business"
                onClick={() =>
                  this.setState({ agreement: !this.state.agreement })
                }
              />
            </Form.Group>
            <Button 
                    id={"placeOrderButton"}
                    disabled={!this.state.placeOrderReady}
                    onClick={this.onSubmit}>Place Order</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Checkout;
