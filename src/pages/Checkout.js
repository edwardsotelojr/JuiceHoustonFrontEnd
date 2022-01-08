import { Check } from "@material-ui/icons";
import { arrayOf } from "prop-types";
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Boxable from "../components/Boxable";
import Box from "../components/Box";
import "./DragThingsToBoxesDemo.css";
import StripeCheckout from "react-stripe-checkout";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const date = [
  { id: "ed", content: "ed" },
  { id: "sd", content: "sd" },
];

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: {
        ["Dates"]: {
          name: "Dates",
          items: date,
        },
        "day1": {
          name: "",
          items: [],
        },
        "day2": {
          name: "",
          items: [],
        },
        "day3": {
          name: "",
          items: [],
        },
        "day4": {
          name: "",
          items: [],
        },
        "day5": {
          name: "",
          items: [],
        },
        "day6": {
          name: "",
          items: [],
        },
        "day7": {
          name: "",
          items: [],
        },
      },
      data: this.props.location.state,
      selectedDates: ["", "", "", "", ""],
      name: "",
      email: "",
      phone: 0,
      address: "",
      zipcode: 0,
    };
    this.selectedDay = this.selectedDay.bind(this);
    this.daysAvailable = this.daysAvailable.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

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
         if(key === "Dates") {
        return;
      }
      console.log("ygfjyx")
      this.setState((prevState) => ({
        ...prevState,
        columns: {
          ...prevState.columns, // copy all other key-value pairs of food object
          [key]: {
            //...prevState[columns][day],
            // specific object of food object
            name: arrayOfDays[i++], // update value of specific key
            items: []
          },
        },
      }));
    })
  } 
    

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
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onDragEnd = (result, columns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log(result);
    console.log(columns);
    if (columns[destination.droppableId].items.length == 1) {
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
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

    const amount =
      this.props.location.state.cost[0] +
      this.props.location.state.cost[1] +
      this.props.location.state.cost[2];
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
                    <h2>{column.name}</h2>
                    <div style={{ margin: 8 }}>
                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? "lightblue"
                                  : "lightgrey",
                                padding: 4,
                                width: 250,
                                minHeight: 100,
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
                                            padding: 16,
                                            margin: "0 0 8px 0",
                                            minHeight: "50px",
                                            backgroundColor: snapshot.isDragging
                                              ? "#263B4A"
                                              : "#456C86",
                                            color: "white",
                                            ...provided.draggableProps.style,
                                          }}
                                        >
                                          {item.content}
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
              <Button>Login </Button>
              <p>Login for quicker checkout</p>
            </Col>
          ) : null}
        </Row>
        <Row
          style={{
            margin: 0,
            whiteSpace: "nowrap",
            overflowX: "scroll",
            flexWrap: "nowrap",
            scrollbarWidth: "none",
          }}
        >
          {this.state.data.drinks
            .slice(0, this.state.data.sizeOfOrder)
            .map((drink, index) => (
              <Col
                key={index}
                style={{
                  backgroundColor: this.state.data.color[index],
                  borderStyle: "solid",
                  borderRadius: "20px",
                  margin: "0px 7px 0px 0px",
                  width: "max-content",
                }}
              >
                <h3>Drink {index + 1}</h3>
                <div style={{ marginBottom: "40px" }}>
                  {this.listIngredients(drink)}
                </div>
                <select
                  style={{ marginTop: "10px", marginBottom: "5px" }}
                  id={index}
                  value={this.state.selectedDates[index]}
                  onChange={this.selectedDay}
                >
                  <option>select day</option>
                  {this.state.arrayOfDays ? (
                    this.state.arrayOfDays.map((date, i) => (
                      <option key={i} value={date} id={index}>
                        {date}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
                <div style={{ textAlign: "center" }}>
                  {this.state.selectedDates[index]} {/* date selected */}
                </div>
              </Col>
            ))}
        </Row>
        <Row>
          <Form>
            <Form.Label
              style={{
                marginTop: "10px",
                marginLeft: "20px",
                marginRight: "10px",
              }}
            >
              Cup Option:
            </Form.Label>
            <Form.Check inline name={"cup"} type={"radio"} label={"glass"} />
            <Form.Check inline name={"cup"} type={"radio"} label={"plastic"} />
          </Form>
        </Row>
        <Row>
          <Col sm={4}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={this.onChange}
                defaultValue={this.props.user.name}
                name="name"
                type="name"
                placeholder="Enter name"
              />
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                defaultValue={this.props.user.email}
                name="email"
                placeholder="Enter email"
              />
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                defaultValue={this.props.user.phone}
                name="phone"
                placeholder="Enter phone"
              />
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                defaultValue={this.props.user.address}
                name="address"
                placeholder="Enter address"
              />
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                type="number"
                name="zipcode"
                defaultValue={this.props.user.zipcode}
                placeholder="Enter zipcode"
              />
            </Form.Group>
          </Col>
          <Col>
            <div style={{ height: "7px" }} />
            <Elements stripe={stripePromise}>
              <CardElement />
            </Elements>
            <Form.Label>Instructions</Form.Label>
            <Form.Control
              as="textarea"
              name="instructions"
              rows={3}
              defaultValue={this.props.user.instructions}
              placeholder="optional"
            />
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
