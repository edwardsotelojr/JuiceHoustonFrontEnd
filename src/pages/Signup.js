import React, { Component } from "react";
import {
  Alert,
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
import zipcodes from "../zipcode";
import history from "../history";
import axios from "axios";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      phone: "",
      address: "",
      homeType: "house",
      zipcode: "",
      suiteNumber: "",
      gateCode: "",
      instructions: "",
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      passwordMatch: false,
      phoneValid: false,
      addressValid: true,
      zipcodeValid: false,
      suiteNumberValid: true,
      instructionsValid: true,
      checkBoxValid: false,
      formValid: false,

      nameBorder: {},
      emailBorder: {},
      passwordBorder: {},
      passwordMatchBorder: {},
      phoneBorder: {},
      addressBorder: {},
      zipcodeBorder: {},
      suiteNumberBorder: {},
      instructionsBorder: {},
      checkBoxBorder: {},

      error: "",
      showAlert: false,
    };
    this.nameTarget = React.createRef();
    this.emailTarget = React.createRef();
    this.passwordTarget = React.createRef();
    this.passwordMatchTarget = React.createRef();
    this.phoneTarget = React.createRef();
    this.addressTarget = React.createRef();
    this.zipcodeTarget = React.createRef();
    this.suiteNumberTarget = React.createRef();
    this.instructionsTarget = React.createRef();

    this.radioCheck = this.radioCheck.bind(this);
    this.validation = this.validation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.validateForm();
    if (this.state.formValid === false) {
      return;
    }
    const {
      name,
      email,
      password,
      phone,
      address,
      zipcode,
      gateCode,
      suiteNumber,
      instructions,
      checkBoxValid,
    } = this.state;
    const newUser = {
      name,
      email,
      password,
      phone,
      address,
      zipcode,
      gateCode,
      suiteNumber,
      instructions,
      termsOfAgreement: checkBoxValid,
    };
    axios
      .post("https://juicedhouston.com/api/signup", newUser)
      .then((res) => {
        if (res.status === 200) {
          history.push({
            pathname: "/verify",
            state: { email: newUser.email },
          });
        } else if (res.status === 500) {
          this.setState({ error: res.response.data.msg, showAlert: true });
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }) // re-direct to login on successful register
      .catch((err) => {
        this.setState({ error: err.message, showAlert: true });
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
  };

  validation(e) {
    const name = e.target.name;
    const value = e.target.value;
    var valid = false;
    var border = { borderColor: "red" };

    switch (name) {
      case "name":
        valid = value.length >= 1 && value.length < 15;
        if (valid) border = {};
        break;
      case "email":
        if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          valid = true;
          border = {};
        }
        break;
      case "password":
        valid = value.length >= 6 && value.length <= 20;
        if (valid) border = {};
        if (Object.entries(this.state.passwordMatchBorder).length === 1) {
          this.validation({
            target: { name: "repeatPassword", value: this.state.repeatPassword },
          });
        }
        if(this.state.password === this.state.repeatPassword){
          this.setState({passwordMatch: true})
        } else{
          this.setState({passwordMatch: false})
        }
        break;
      case "repeatPassword":
        if(this.state.password === this.state.repeatPassword){
          this.setState({passwordMatch: true})
        } else{
          this.setState({passwordMatch: false})
        }
        if (this.state.passwordValid) {
          if (this.state.password === value) {
            valid = true;
            border = {};
            break;
          }
        }
        break;
      case "phone":
        if (value.length === 10) {
          valid = true;
          border = {};
        }
        break;
      case "address":
        valid = true;
        border = {};
        break;
      case "zipcode":
        for (var z in zipcodes) {
          if (zipcodes[z] === Number(value)) {
            valid = true;
            border = {};
            break;
          }
        }
        break;
      case "suiteNumber":
        if (value === "") {
          valid = false;
          border = { borderColor: "red" };
        } else {
          valid = true;
          border = {};
        }
        break;
      case "instructions":
        valid = value.length >= 0 && value.length < 200;
        if (valid) border = {};
        break;
      default:
        break;
    }
    if (e.target.name === "repeatPassword") {
      this.setState(
        {
          [e.target.name + "Valid"]: valid,
          "passwordBorder": border,
          [e.target.name + "Border"]: border,
        },
        function () {
          this.validateForm();
        }
      );
    } else {
      this.setState(
        {
          [e.target.name + "Valid"]: valid,
          [e.target.name + "Border"]: border,
        },
        function () {
          this.validateForm();
        }
      );
    }
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      function () {
        this.validateForm();
      }
    );
    if (e.target.name === "homeType" && e.target.value === "house") {
      this.setState({
        gateCode: "",
        suiteNumber: "",
      });
    }
  }
  radioCheck(e) {
    if (e.target.value === "house") {
      this.setState(
        {
          homeType: "house",
          suiteNumberValid: true,
          suiteNumber: "",
          gateCode: "",
        },
        function () {
          this.validateForm();
        }
      );
    } else {
      this.setState(
        {
          homeType: "apartment",
          suiteNumberValid: false,
          suiteNumber: "",
          gateCode: "",
        },
        function () {
          this.validateForm();
        }
      );
    }
  }
  validateForm() {
    const {
      nameValid,
      emailValid,
      passwordValid,
      passwordMatch,
      phoneValid,
      zipcodeValid,
      addressValid,
      suiteNumberValid,
      instructionsValid,
      checkBoxValid,
    } = this.state;
    const formValid =
      nameValid &&
      emailValid &&
      passwordValid &&
      passwordMatch &&
      phoneValid &&
      zipcodeValid &&
      addressValid &&
      suiteNumberValid &&
      instructionsValid &&
      checkBoxValid;
    this.setState({ formValid: formValid });
  }

  render() {
    return (
      <Container>
        <Row style={{ paddingTop: "13px" }}>
          <Col>
            <Alert
              variant="danger"
              show={this.state.showAlert}
              style={{ marginBottom: "5px" }}
            >
              {this.state.error}
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={this.onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  name="name"
                  onBlur={this.validation}
                  onChange={this.handleChange}
                  placeholder="Enter name"
                  style={this.state.nameBorder}
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
                    Character range: 1 - 15
                  </Popover>
                </Overlay>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onBlur={this.validation}
                  onChange={this.handleChange}
                  placeholder="Enter email"
                  style={this.state.emailBorder}
                  ref={this.emailTarget}
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

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onBlur={this.validation}
                  onChange={this.handleChange}
                  placeholder="Password"
                  style={this.state.passwordBorder}
                  ref={this.passwordTarget}
                />
                <Overlay
                  transition={Fade}
                  target={this.passwordTarget.current}
                  show={
                    Object.entries(this.state.passwordBorder).length === 1 &&
                    !this.state.passwordValid
                  }
                  placement="top"
                >
                  <Popover
                    id="popover-contained"
                    style={{ padding: "3px 5px 3px 20px", zIndex: "5" }}
                  >
                    <li> 6 - 20 Characters </li>
                  </Popover>
                </Overlay>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  type="password"
                  name="repeatPassword"
                  onBlur={this.validation}
                  onChange={this.handleChange}
                  ref={this.passwordMatchTarget}
                  style={this.state.passwordMatchBorder}
                  placeholder="Repeat Password"
                />
              </Form.Group>
              <Overlay
                transition={Fade}
                target={this.passwordMatchTarget.current}
                show={
                  Object.entries(this.state.passwordMatchBorder).length === 1
                }
                placement="top"
              >
                <Popover
                  id="popover-contained"
                  style={{ padding: "5px 5px 0px 5px", zIndex: "5" }}
                >
                  <p> password does not match </p>
                </Popover>
              </Overlay>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  onBlur={this.validation}
                  onChange={this.handleChange}
                  ref={this.phoneTarget}
                  style={this.state.phoneBorder}
                  placeholder="Enter phone number"
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
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  onBlur={this.validation}
                  onChange={this.handleChange}
                  placeholder="Address"
                  ref={this.addressTarget}
                  style={this.state.addressBorder}
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
              <Form.Group className="mb-3">
                <Form.Label>Zipcode</Form.Label>
                <Form.Control
                  type="text"
                  name="zipcode"
                  onBlur={this.validation}
                  onChange={this.handleChange}
                  placeholder="zip code"
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
                    style={{ padding: "5px 5px 0px 5px", zIndex: "5" }}
                  >
                    <p> zipcode not in range for delivery. </p>
                  </Popover>
                </Overlay>
              </Form.Group>
              <Form.Group style={{ display: "inline-flex" }}>
                <Form.Control
                  type="radio"
                  id="house"
                  defaultChecked
                  value="house"
                  name="homeType"
                  style={{width: "min-content"}}
                  onClick={() => this.setState({homeType: "house"})}
                />
                <Form.Label
                  htmlFor="house"
                  style={{ marginLeft: "3px", alignSelf: "flex-end" }}
                >
                  House
                </Form.Label>
                <Form.Control
                  type="radio"
                  id="apartments"
                  value="apartments"
                  name="homeType"
                  style={{marginLeft: "20px", width: "min-content"}}
                  onClick={() => this.setState({homeType: "apartments"})}
                />
                <Form.Label
                  htmlFor="apartments"
                  style={{ marginLeft: "3px", alignSelf: "flex-end" }}
                >
                  Apartments
                </Form.Label>
              </Form.Group>
              {this.state.homeType === "apartments" ? (
                  <Form.Group className="mb-3">
                    <Form.Label>Gate Code</Form.Label>
                    <Form.Text
                      className="text-muted"
                      style={{ float: "right" }}
                    >
                      if necessary
                    </Form.Text>
                    <Form.Control
                      type="text"
                      name="gateCode"
                      onChange={this.handleChange}
                      placeholder="Enter Gate Code"
                    />
                    <Form.Label>Suite Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="suiteNumber"
                      ref={this.suiteNumberTarget}
                      style={this.state.suiteNumberBorder}
                      //onBlur={this.validation}
                      onChange={this.handleChange}
                      placeholder="Enter Suite Number"
                    />
                    <Overlay
                      transition={Fade}
                      target={this.suiteNumberTarget.current}
                      show={
                        Object.entries(this.state.suiteNumberBorder).length ===
                        1
                      }
                      placement="top"
                    >
                      <Popover
                        id="popover-contained"
                        style={{ padding: "5px 5px 0px 5px", zIndex: "5" }}
                      >
                        <p> Suite Number cannot be blank. </p>
                      </Popover>
                    </Overlay>
                  </Form.Group>
                ) : (
                  <></>
                )}
              <Form.Group className="mb-3">
                <Form.Label>Instructions for delivery</Form.Label>
                <Form.Text className="text-muted" style={{ float: "right" }}>
                  Drink will be place in a shaded area to keep it cool
                </Form.Text>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={this.state.instructions}
                  onBlur={this.validation}
                  name="instructions"
                  onChange={this.handleChange}
                  placeholder="optional"
                />
              </Form.Group>
              <Card style={{ border: "none" }}>
                <Card.Subtitle className="mb-2 text-muted">
                  Terms of Agreements
                </Card.Subtitle>

                <Card.Body
                  style={{
                    height: "150px",
                    overflow: "scroll",
                    borderColor: "black",
                    borderStyle: "solid",
                    borderWidth: "1px",
                  }}
                >
                  <Card.Text>
                All Sales are final. You are allow to change the delivery date for 
                a juice before 6pm the day before previously schedule date. Juices 
                are prepared the night before delivery, with fresh washed produce. 
                The Juicer is cleaned before every juice is made. No cross contamination. 
                The person making the juice is always a mask and gloves on. The juices 
                are refrigerated upon delivery. Fresh Juices are meant to be consumed 
                the day of delivery. Juices are placed in an shaded area when delivered, 
                minding the duration of the shaded area. Please recycle the bottle with 
                the cap off. If your juice get stolen, that really sucks for you, because 
                I will do nothing about it. Thank you.
                  </Card.Text>
                </Card.Body>
                <Form.Check
                  type="checkbox"
                  style={{ marginTop: "5px" }}
                  label="I agree to the terms of agreements."
                  onChange={() => {
                    this.setState(
                      {
                        checkBoxValid: !this.state.checkBoxValid,
                      },
                      function () {
                        this.validateForm();
                      }
                    );
                  }}
                />
              </Card>
              {this.state.formValid && (
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              )}
            </Form>
          </Col>
        </Row>
        <div style={{ height: "10px" }}></div>
      </Container>
    );
  }
}
export default Signup;
