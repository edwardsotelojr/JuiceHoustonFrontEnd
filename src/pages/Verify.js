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
      <Container fluid style={{ display: 'grid', height: "100vh", backgroundColor: "#fffced",
    }} ><Row className="justify-content-center">
      <Col className="align-self-center" xs="auto"><p>Enter Verification Code</p> </Col></Row>
        <Row className="justify-content-center">
          <Col className="align-self-center" xs="auto">
                <input className="inputField" type='text' maxLength={"1"}/>
                <input type='text' className="inputField" maxLength={"1"}/>
                <input type='text' className="inputField" maxLength={"1"}/>
                <input type='text' className="inputField" maxLength={"1"}/>

         </Col>
        </Row>
      </Container>
    );
  }
}
export default Verify;
