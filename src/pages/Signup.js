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
import geocoder from "google-geocoder";
import zipcodes from "../zipcode";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import history from "../history";
import axios from "axios";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordMatch: "",
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
      suiteNumberValid: false,
      instructionsValid: true,
      checkBoxValid: false,
      formValid: true,

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
    console.log("submitted");
    //this.validateForm()
    //if(this.state.formValid == false){
    //  return
    //}
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
    //console.log(this.props.signup(newUser));
    axios
      .post("http://localhost:8000/signup", newUser)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          console.log("go to verify");
          history.push({
            pathname: "/verify",
            state: { email: newUser.email },
          });
        } else if (res.status == 500) {
          console.log("500");
          this.setState({ error: res.response.data.msg, showAlert: true });
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          //return res.data.msg
        }
      }) // re-direct to login on successful register
      .catch((err) => {
        console.log("error with axios request: ", err.response.data.msg);
        this.setState({ error: err.response.data.msg, showAlert: true });
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        //return err.response.data.msg
        /* dispatch({
        type: SIGNUP_ERROR,
        payload: err.response,
      }) */
      })
      .finally(() => {
        console.log("finally");
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
        if (Object.entries(this.state.passwordMatchBorder).length == 1) {
          this.validation({
            target: { name: "passwordMatch", value: this.state.passwordMatch },
          });
        }
        break;
      case "passwordMatch":
        if (this.state.passwordValid) {
          if (this.state.password === value) {
            valid = true;
            border = {};
            console.log("here");
            break;
          }
        }
        break;
      case "phone":
        if (value.length == 10) {
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
          if (zipcodes[z] == Number(value)) {
            valid = true;
            border = {};
            break;
          }
        }
        break;
      case "suiteNumber":
        if (value === "") {
          console.log(value);
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
    if (e.target.name == "passwordMatch") {
      this.setState(
        {
          [e.target.name + "Valid"]: valid,
          ["passwordBorder"]: border,
          [e.target.name + "Border"]: border,
        },
        this.validateForm
      );
    } else {
      this.setState(
        {
          [e.target.name + "Valid"]: valid,
          [e.target.name + "Border"]: border,
        },
        this.validateForm
      );
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.name == "homeType" && e.target.value == "house") {
      this.setState({
        gateCode: "",
        suiteNumber: "",
      });
    }
    if (e.target.style.borderColor == "red") {
      this.validation(e);
    }
  }
  radioCheck(e) {
    console.log("radiocheck");
    if (e.target.value == "house") {
      this.setState(
        {
          homeType: "house",
          suiteNumberValid: true,
          suiteNumber: null,
          gateCode: null,
        },
        this.validateForm
      );
    } else {
      this.setState(
        {
          homeType: "apartment",
          suiteNumberValid: false,
          suiteNumber: null,
          gateCode: null,
        },
        this.validateForm
      );
    }
  }
  //TODO: fix zipcode validation. in range for delievry.
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
    console.log("checkbox ", checkBoxValid);
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
    console.log("formValid ", formValid);
    this.setState({ formValid: formValid });
  }

  render() {
    const { errors } = this.state;

    // newBounds.extend(new LatLng({ latitude: 29.651783, longitude: -95.519794}),
    //   new LatLng({latitude: 29.960267, longitude: -95.223487}));

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
                  //autoFocus
                  type="text"
                  name="name"
                  //onBlur={this.validation}
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
                  //onBlur={this.validation}
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
                  //onBlur={this.validation}
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
                  name="passwordMatch"
                  //onBlur={this.validation}
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
                  //onBlur={this.validation}
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
                  isInvalid={!this.state.addressValid}
                  //onBlur={this.validation}
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
                  //onBlur={this.validation}
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
              <Form.Group>
                <RadioGroup
                  //onBlur={this.validation}
                  onChange={this.radioCheck}
                  style={{ flexDirection: "row" }}
                >
                  <FormControlLabel
                    value="house"
                    name="homeType"
                    control={<Radio checked={true} />}
                    label="house"
                  />
                  <FormControlLabel
                    value="apartment"
                    name="homeType"
                    control={<Radio />}
                    label="apartment"
                  />
                </RadioGroup>
                {this.state.homeType === "apartment" ? (
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
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Instructions for delivery</Form.Label>
                <Form.Text className="text-muted" style={{ float: "right" }}>
                  Drink will be place in a shaded area to keep it cool
                </Form.Text>
                <Form.Control
                  type="text"
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
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content. Some quick example text
                    to build on the card title and make up the bulk of the
                    card's content. Some quick example text to build on the card
                    title and make up the bulk of the card's content. Some quick
                    example text to build on the card title and make up the bulk
                    of the card's content.
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
                      } /*, function () {this.validateForm(); }*/
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
