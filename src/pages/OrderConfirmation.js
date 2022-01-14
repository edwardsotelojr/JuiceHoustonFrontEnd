import React, { Component } from "react";
import {
  Container,
  Col,
  Row,
} from "react-bootstrap";
class OrderConfirmation extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container fluid>
        <Row className="justify-content-center">
          <Col> Order Confirmation</Col>
        </Row>
      </Container>
    );
  }
}
export default OrderConfirmation;
