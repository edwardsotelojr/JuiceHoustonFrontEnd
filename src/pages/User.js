import React from "react";
import { Container, Row, Col, Jumbotron, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user.user,
      orders: null,
      isLoading: true,
      show: false,
      changableDrinks: [],
      selectedOrderLastDate: "",
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.availableChanges = this.availableChanges.bind(this);
    this.deliveryDateChanged = this.deliveryDateChanged.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  saveChanges() {
    var strDate;
    for (var i = 0; i < this.state.changableDrinks.length; i++) {
      strDate = new Date(new Date(this.state.changableDrinks[i].deliveryDate))
        .toString()
        .slice(0, 15);
      axios
        .patch("http://localhost:8000/updateDrink", {
          drinkId: this.state.changableDrinks[i]._id,
          deliveryDate: strDate,
        })
        .then((res) => {
          if (res.data == "success") {
            this.setState({ show: false });
          }
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }
  }

  deliveryDateChanged = (e) => {
    var order = this.state.changableDrinks;
    order[Number(e.target.name)].deliveryDate = e.target.value;
    this.setState({ changableDrinks: order });
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8000/orders/`, {
        params: { email: this.state.user.email },
      })
      .then((res) => {
        this.setState({ isLoading: false, orders: res.data.orders });
      })
      .catch((err) => console.log("error: ", err));
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow = (lastDay) => {
    this.setState({ show: true, selectedOrderLastDate: lastDay });
  };

  availableChanges(drinksArray, lastDay) {
    this.setState({ changableDrinks: [] });
    drinksArray.forEach((drink) => {
      if (
        new Date(drink.deliveryDate) < new Date(lastDay) &&
        new Date() < new Date(drink.deliveryDate) &&
        drink.delivered == false
      ) {
        //changable
        this.setState((prevState) => ({
          changableDrinks: [...prevState.changableDrinks, drink],
        }));
      }
    });
  }

  renderDates(lastDate, deliveryDate) {
    let dDate = moment.tz(deliveryDate, "America/Chicago");
    let currentDate = moment.tz(Date.now(), "America/Chicago");
    var arr = [];
    if (Number(currentDate.format("HH")) >= 18) {
      currentDate.add(32, "hours");
    }
    var i = 0;
    while (currentDate < lastDate) {
      if (currentDate.format("MM/DD/YYYY") == dDate.format("MM/DD/YYYY")) {
        arr.push(
          <option name={i} value={currentDate.format("MM/DD/YYYY")}>
            {currentDate.format("MM/DD/YYYY")}
          </option>
        );
      } else {
        arr.push(
          <option name={i} value={currentDate.format("MM/DD/YYYY")}>
            {currentDate.format("MM/DD/YYYY")}
          </option>
        );
      }
      i++;
      currentDate.add(24, "hours");
    }
    return arr;
  }

  orderChangable(order) {
    // return true or false
    for (var i = 0; i < order.drinks.length; i++) {
      if (order.drinks[i].delivered == false) return true;
    }
    if (new Date() < Date(order.lastDay)) return true;
    return false;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div
          className="App"
          style={{ marginTop: "10px", backgroundColor: "rgb(255, 255 ,240)" }}
        ></div>
      );
    }
    if (this.state.user.email == undefined) return <p>not logged in</p>;
    return (
      <Container
        style={{ marginTop: "10px", backgroundColor: "rgb(255, 255 ,240)" }}
      >
        <br />
        <Jumbotron style={{ padding: "10px", marginBottom: "5px" }}>
          <Container fluid>
            <Row className="justify-content-between">
              <Col className="col-auto">
                <h2>{this.state.user.name}</h2>
                <h3>
                  {this.state.user.address}, {this.state.user.zipcode}
                </h3>
                <h4>
                  {this.state.user.phone.toString().substring(0, 3)}-
                  {this.state.user.phone.toString().substring(3, 6)}-
                  {this.state.user.phone.toString().substring(6, 10)}
                </h4>
                {this.state.user.instructions != "" ? (
                  <p>Instructions: {this.state.user.instructions}</p>
                ) : (
                  <></>
                )}
                <Link
                  to={{
                    pathname: "/edit",
                    state: { user: this.state.user },
                  }}
                >
                  Edit
                </Link>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Row style={{ paddingBottom: "10px" }}>
          <Col xs={12} sm={12} md={8} style={{}}>
            <h3> Order History </h3>
            {this.state.orders.map((o, i) => (
              <>
                <Row style={{ marginBottom: "5px" }}>
                  <p style={{ paddingTop: "5px", marginBottom: 0 }}>
                    Order Placed on {o.orderPlaced}
                  </p>
                  {this.orderChangable(o) ? (
                    <Button
                      style={{ position: "absolute", right: "0" }}
                      size="sm"
                      onClick={() => {
                        this.handleShow(o.lastDay);
                        this.availableChanges(o.drinks, o.lastDay);
                      }}
                    >
                      Change Delivery Dates
                    </Button>
                  ) : (
                    <></>
                  )}
                </Row>
                <Row style={{ marginBottom: "5px" }}>
                  {o.drinks
                    .sort(
                      (a, b) =>
                        new Date(a.deliveryDate) - new Date(b.deliveryDate)
                    )
                    .map((d, ii) => (
                      <Col
                        style={{
                          margin: "5px",
                          backgroundColor: d.color,
                          opacity: 0.9,
                          borderRadius: "9px",
                          borderStyle: "solid",
                          borderWidth: "2px",
                        }}
                      >
                        <p style={{ fontSize: "14px", marginBottom: "5px" }}>
                          Delivery Date:{" "}
                          {new Date(new Date(d.deliveryDate).getTime())
                            .toString()
                            .slice(0, 15)}{" "}
                          {d.delivered ? <p>Delivered</p> : <></>}
                        </p>
                        {Object.keys(d.ingredients).map((k) => (
                          <p style={{ fontSize: "14px", margin: "3px" }}>
                            {k}: {d.ingredients[k]}oz.
                          </p>
                        ))}
                      </Col>
                    ))}
                </Row>
              </>
            ))}
          </Col>
        </Row>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {this.state.changableDrinks.map((d, i) => (
                <Col style={{ backgroundColor: d.color }}>
                  <select
                    onChange={this.deliveryDateChanged}
                    defaultValue={moment
                      .tz(new Date(d.deliveryDate), "America/Chicago")
                      .format("MM/DD/YYYY")}
                  >
                    {this.renderDates(
                      new Date(this.state.selectedOrderLastDate),
                      new Date(d.deliveryDate)
                    )}
                  </select>
                  {Object.keys(d.ingredients).map((key) => (
                    <p>
                      {key}: {d.ingredients[key]}
                    </p>
                  ))}
                </Col>
              ))}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.saveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default User;
