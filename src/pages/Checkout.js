import React from "react";
import axios from "axios";
import {
  Container,
  Row,
  Card,
  Col,
  Form,
  Button,
  Alert,
  Overlay,
  Fade,
  Popover,
} from "react-bootstrap";
import { CheckoutForm } from "../components/CheckoutForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import moment from "moment-timezone";
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
        color: props.location.state.color[i],
        cost: props.location.state.cost[i],
      };
    }
    var name = "";
    var email = "";
    var address = "";
    var phone = "";
    var zipcode = "";
    var gateCode = "";
    var suiteNumber = "";
    var instructions = "";
    if (Object.keys(this.props.user).length != 0) {
      name = this.props.user.name;
      email = this.props.user.email;
      address = this.props.user.address;
      phone = this.props.user.phone;
      zipcode = this.props.user.zipcode;
      gateCode = this.props.user.gateCode;
      suiteNumber = this.props.user.suiteNumber;
      instructions = this.props.user.instructions;
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
      name: name,
      email: email,
      loginEmail: "",
      password: "",
      phone: phone,
      address: address,
      zipcode: zipcode,
      gateCode: gateCode,
      suiteNumber: suiteNumber,
      instructions: instructions,
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
      orderReady: false,
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
    this.validation = this.validation.bind(this);

  }

  componentDidMount() {
    this.daysAvailable();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    }); // reset the scroll position to the top left of the document.  }
  }

  componentDidUpdate() {
    console.log("update");
    this.placeOrderReady();
  }

  handleLogin = (e) => {
    e.preventDefault();
    var user = { email: this.state.loginEmail, password: this.state.password };
    axios.post(process.env.BE+ "login", user).then((res) => {
      if (res.status == 200) {
        console.log(res);
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
        this.props.signinAtCheckout(res.data.token);
      }
    });
  };

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
          <p key={index} style={{ marginBottom: ".3rem" }}>
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
  }

  validation = () => {
    var zipcodeValid = false;
    var border = { borderColor: "red" };
    for (var z in zipcodes) {
      if (zipcodes[z] == Number(this.state.zipcode)) {
        zipcodeValid = true;
      }
    }
    if (!zipcodeValid) {
      this.setState({ zipcodeValid: false, zipcodeBorder: border });
      ;
    } else {
      this.setState({ zipcodeValid: true, zipcodeBorder: {} });
    }
    if (this.state.name.length >= 1 && this.state.name.length < 15) {
      this.setState({ nameValid: true, nameBorder: {} });
    } else {
      this.setState({ nameValid: false, nameBorder: border });
    }
    if (this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({ emailValid: true, emailBorder: {} });
    } else {
      this.setState({ emailValid: false, emailBorder: border });
    }
    if (String(this.state.phone).length == 10) {
      this.setState({ phoneValid: true, phoneBorder: {} });
    } else {
      this.setState({ phoneValid: false, phoneBorder: border });
    }
    if (this.state.address.length > 0 && this.state.address.length < 50) {
      this.setState({ addressValid: true, addressBorder: {} });
    } else {
      this.setState({ addressValid: false, addressBorder: border });
    }
    if (this.state.suiteNumber.length > 20) {
      this.setState({ suiteNumberValid: false, suiteNumberBorder: border });
    } else {
      this.setState({ suiteNumberValid: true, suiteNumberBorder: {} });
    }
    if (this.state.gateCode.length > 20) {
      this.setState({ gateCodeValid: false, gateCodeBorder: border });
    } else {
      this.setState({ gateCodeValid: true, gateCodeBorder: {} });
    }
    if (this.state.instructions.length > 500) {
      this.setState({ instructionsValid: false, instructionsBorder: border });
    } else {
      this.setState({ instructionsValid: true, instructionsBorder: {} });
    }
  };

  placeOrderReady = () => {
    if (this.state.columns.Dates.items.length != 0) {
      return;
    }
    console.log("here in placeorderready");
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
      if (this.state.orderReady != true) this.setState({ orderReady: true });
    } else {
      if (this.state.orderReady != false) this.setState({ orderReady: false });
    }
  };

  onDragEnd = (result, columns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      const juiceNumber = parseInt(result.draggableId[5]);
      const deliveryDate = moment
        .tz(new Date(columns[destination.droppableId].name), "America/Chicago")
        .format("MM/DD/YYYY");
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
    )
    const renderIngredients = (ingredients) => {
      var d = [];
      for (const [key, value] of Object.entries(ingredients)) {
        d.push(
          <p key={key} style={{ marginBottom: 0, fontSize: "15px" }}>
            {key}: {value}oz.
          </p>
        );
      }
      return d;
    };

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
      totalCost: this.state.totalCost.toFixed(2),
      drinks: drinks,
    };

    return (
      <Container fluid style={{ backgroundColor: "rgb(255, 255, 240)" }}>
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
                                              : item.color,
                                            color: "white",
                                            ...provided.draggableProps.style,
                                          }}
                                        >
                                          <b>{item.content}</b> $
                                          {item.cost.toFixed(2)}
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
                        value={this.state.loginEmail}
                        onChange={(e) => {
                          e.stopPropagation();
                          this.setState({ loginEmail: e.target.value });
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
                onChange={this.onChange}
                value={this.state.name}
                name="name"
                type="text"
                style={this.state.nameBorder}
                placeholder="Enter name"
                ref={this.nameTarget}
              />
              <Overlay
                transition={Fade}
                target={this.nameTarget.current}
                show={Object.entries(this.state.nameBorder).length === 1}
                placement="top"
              >
                <Popover
                  id="popover-contained"
                  style={{ padding: "3px 5px 3px 5px", zIndex: "5" }}
                >
                  invalid name
                </Popover>
              </Overlay>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={this.onChange}
                value={this.state.email}
                name="email"
                placeholder="Enter email"
                ref={this.emailTarget}
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
                  style={{ padding: "3px 5px 3px 5px", zIndex: "5" }}
                >
                  invalid email
                </Popover>
              </Overlay>
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                onChange={this.onChange}
                type="tel"
                value={this.state.phone}
                name="phone"
                placeholder="Enter phone"
                style={this.state.phoneBorder}
                ref={this.phoneTarget}
              />

              <Overlay
                transition={Fade}
                target={this.phoneTarget.current}
                show={Object.entries(this.state.phoneBorder).length === 1}
                placement="top"
              >
                <Popover
                  id="popover-contained"
                  style={{ padding: "5px 5px 0px 5px", zIndex: "5" }}
                >
                  <p> phone number not valid. </p>
                </Popover>
              </Overlay>
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                onChange={this.onChange}
                type="text"
                value={this.state.address}
                name="address"
                placeholder="Enter address"
                style={this.state.addressBorder}
                ref={this.addressTarget}
              />
              <Overlay
                transition={Fade}
                target={this.addressTarget.current}
                show={Object.entries(this.state.addressBorder).length === 1}
                placement="top"
              >
                <Popover
                  id="popover-contained"
                  style={{ padding: "5px 5px 0px 5px", zIndex: "5" }}
                >
                  <p> address is not valid. </p>
                </Popover>
              </Overlay>
            </Form.Group>
            <Form.Group>
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                onChange={this.onChange}
                type="number"
                name="zipcode"
                placeholder="Enter zipcode"
                value={this.state.zipcode}
                style={this.state.zipcodeBorder}
                ref={this.zipcodeTarget}
              />
              <Overlay
                transition={Fade}
                target={this.zipcodeTarget.current}
                show={Object.entries(this.state.zipcodeBorder).length === 1}
                placement="top"
              >
                <Popover
                  id="popover-contained"
                  style={{ padding: "5px 5px 0px 5px", zIndex: "5" }}
                >
                  <p> zipcode not in range for delivery. </p>
                </Popover>
              </Overlay>
            </Form.Group>
            <Form.Group>
              <Form.Label>Gate Code</Form.Label>
              <Form.Control
                onChange={this.onChange}
                value={this.state.gateCode}
                name="gateCode"
                type="text"
                placeholder="Enter gate code (optional)"
                ref={this.gateCodeTarget}
                style={this.state.gateCodeBorder}
              />
              <Overlay
                transition={Fade}
                target={this.gateCodeTarget.current}
                show={Object.entries(this.state.gateCodeBorder).length === 1}
                placement="top"
              >
                <Popover
                  id="popover-contained"
                  style={{ padding: "5px 5px 0px 5px", zIndex: "5" }}
                >
                  <p> gate code not valid </p>
                </Popover>
              </Overlay>
            </Form.Group>
            <Form.Group>
              <Form.Label>Suite Number</Form.Label>
              <Form.Control
                onChange={this.onChange}
                name="suiteNumber"
                type="text"
                value={this.state.suiteNumber}
                placeholder="Enter Suite Number (optional)"
                ref={this.suiteNumberTarget}
                style={this.state.suiteNumberBorder}
              />

              <Overlay
                transition={Fade}
                target={this.suiteNumberTarget.current}
                show={Object.entries(this.state.suiteNumberBorder).length === 1}
                placement="top"
              >
                <Popover
                  id="popover-contained"
                  style={{ padding: "5px 5px 0px 5px", zIndex: "5" }}
                >
                  <p> suite number not valid </p>
                </Popover>
              </Overlay>
            </Form.Group>
            <div style={{ height: "20px" }}></div>
          </Col>
          <Col>
            <div style={{ height: "7px" }} />

            <Form.Label>Instructions</Form.Label>
            <Form.Control
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
                style={{ padding: "5px 5px 0px 5px", zIndex: "5" }}
              >
                <p> instructions not valid </p>
              </Popover>
            </Overlay>
            <Card>
              <Card.Body style={{ maxHeight: "253px" }}>
                <Card.Title>Order Agreement</Card.Title>
                <Card.Text style={{ overflowY: "scroll", maxHeight: "168px" }}>
                  All Sales are final. You are allow to change the delivery date
                  for a juice before 6pm the day before previously schedule
                  date. Juices are prepared the night before delivery, with
                  fresh washed produce. The Juicer is cleaned before every juice
                  is made. No cross contamination. The person making the juice
                  is always a mask and gloves on. The juices are refrigerated
                  upon delivery. Fresh Juices are meant to be consumed the day
                  of delivery. Juices are placed in an shaded area when
                  delivered, minding the duration of the shaded area. Please
                  recycle the bottle with the cap off. If your juice get stolen,
                  that really sucks for you, because I will do nothing about it.
                  Thank you.
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
            <Elements stripe={stripePromise}>
              <ElementsConsumer>
                {({ elements, stripe }) => (
                  <CheckoutForm
                    elements={elements}
                    stripe={stripe}
                    ready={this.state.orderReady}
                    validation={this.validation}
                    //promptError={this.promptError()}
                    order={order}
                  />
                )}
              </ElementsConsumer>
            </Elements>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Checkout;
