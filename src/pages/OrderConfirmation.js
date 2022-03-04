import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
class OrderConfirmation extends Component {
  constructor() {
    super();
    this.state = {
      drinks: [],

    }
  }

  render() {
    console.log("props: ", this.props)
    return (
      <Container style={{ paddingTop: "30px", backgroundColor: "#fffced"}}>
        <Row className="justify-content-center">
          <Col xs={"auto"}>
            <h1 style={{ textAlign: "center" }}>Order Placed</h1>
            <p>Receipt was sent to edwardsotelojr@gmail.com </p>
          </Col>
        </Row>
        <Row className="justify-content-center" style={{ marginTop: "10px" }}>
          <Col
            xs={"auto"}
            style={{
              paddingLeft: "5px",
              paddingRight: "5px",
              backgroundColor: "#6e9e33",
              borderRadius: "10px",
              borderColor: "black",
              borderStyle: "solid",
              borderWidth: "2px",
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
              Juice 1
            </p>
            <p style={{ fontSize: "15px", margin: 0 }}>4oz Orange</p>
            <p
              style={{
                marginTop: "1px",
                marginBottom: 0,
                fontSize: "17px",
                fontVariant: "all-small-caps",
                textAlign: "center",
              }}
            >
              Delivery Date
            </p>
            <p
              style={{
                marginTop: '-6px',
                marginBottom: 0,
                fontSize: "17px",
                fontVariant: "all-small-caps",
                textAlign: "center",
              }}
            >
              2/13/2021
            </p>
            <p
            style={{
              marginTop: "-5px",
              marginBottom: "3px",
              fontSize: "23px",
              fontVariant: "all-small-caps",
              textAlign: "center",
            }}>$4.20</p>
          </Col>
        </Row>
        <Row className="justify-content-center" style={{
          marginTop: "10px"
        }}>
          <Col xs={"auto"} >
          <p style={{textAlign: "center"}}>
            Total Cost: $13.20  
          </p></Col>
        </Row>
      </Container>
    );
  }
}
export default OrderConfirmation;
