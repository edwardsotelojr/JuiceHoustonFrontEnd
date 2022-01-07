import React, { Component } from "react";
import {
  Container,
  Card,
  Col,
  Form,
  Button,
  Row,
  Popover,
  Overlay,
  Fade,
} from "react-bootstrap";
import './Verify.css'
class Verify extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container fluid ><Row className="justify-content-center">
 <Col> Order Confirmation</Col>
        </Row>
      </Container>
    );
  }
}
export default Verify;
