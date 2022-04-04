import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
class OrderConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: props.location.state,
    };
  }
  render() {
    return (
      <Container style={{ paddingTop: "30px", backgroundColor: "#fffced" }}>
        <Row className="justify-content-center">
          <Col xs={"auto"}>
            <h1 style={{ textAlign: "center" }}>
              Order placed! Thank you, {this.state.order.name}
            </h1>
            <p style={{ textAlign: "center" }}>
              Receipt was sent to edwardsotelojr@gmail.com{" "}
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center" style={{ marginTop: "10px" }}>
          {this.state.order.drinks.map((drink, i) => (
            <Col
              key={i}
              xs={"auto"}
              style={{
                paddingLeft: "5px",
                paddingRight: "5px",
                backgroundColor: drink.color,
                borderRadius: "10px",
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: "2px",
                margin: "5px",
              }}
            >
              <p
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  margin: 0,
                  fontWeight: "bold",
                }}
              >
                Juice {i + 1}
              </p>
              {Object.keys(drink.ingredients).map((ingredient, j) => (
                <p style={{ fontSize: "15px", margin: 0 }}>
                  {drink.ingredients[ingredient]}oz {ingredient}
                </p>
              ))}
              <p
                style={{
                  marginTop: "1px",
                  marginBottom: 0,
                  fontSize: "17px",
                  textAlign: "center",
                }}
              >
                Delivery date
              </p>
              <p
                style={{
                  marginTop: "-6px",
                  marginBottom: "30px",
                  fontSize: "17px",
                  fontVariant: "all-small-caps",
                  textAlign: "center",
                }}
              >
                {drink.deliveryDate}
              </p>
              <p
                style={{
                  fontSize: "20px",
                  position: "absolute",
                  bottom: 0,
                  margin: 0,
                  padding: 0,
                  left: "30%",
                  textAlign: "center",
                }}
              >
                ${Number(drink.price).toFixed(2)}
              </p>
            </Col>
          ))}
        </Row>
        <Row
          className="justify-content-center"
          style={{
            marginTop: "10px",
          }}
        >
          <Col xs={"auto"}>
            <p style={{ textAlign: "center" }}>Total cost: $13.20</p>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default OrderConfirmation;
