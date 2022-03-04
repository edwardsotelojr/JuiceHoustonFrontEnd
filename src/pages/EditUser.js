import { Alert, Container, Row, Col, 
  Form, Button, 
   Overlay, Popover, Fade } from "react-bootstrap";
import React from "react";
import zipcodes from "../zipcode";
import { RadioGroup, Radio, FormControlLabel} from  "@material-ui/core"; 
import axios from 'axios'

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      name: this.props.user.name,
      address: this.props.user.address,
      zipcode: this.props.user.zipcode,
      phone: this.props.user.phone,
      homeType: "house",
      suiteNumber: "",
      gateCode: "",
      instructions: this.props.user.instructions,
      nameValid: true,
      addressValid: true,
      zipcodeValid: true,
      phoneValid: true,
      suiteNumberValid: true,
      gateCodeValid: true,
      instructionsValid: true,
      formValid: true,
      nameBorder: {},
      addressBorder: {},
      zipcodeBorder: {},
      phoneBorder: {},
      suiteNumberBorder: {},
      gateCodeBorder: {},
      instructionsBorder: {},
      error: "",
      showAlert: false,
      success: false
    };
    this.nameTarget = React.createRef();
    this.emailTarget = React.createRef();
    this.phoneTarget = React.createRef();
    this.addressTarget = React.createRef();
    this.zipcodeTarget = React.createRef();
    this.suiteNumberTarget = React.createRef();
    this.gateCodeTarget = React.createRef();
    this.instructionsTarget = React.createRef();
    this.validation = this.validation.bind(this)
    this.radioCheck = this.radioCheck.bind(this);
  }
  componentDidMount() {
    this.setState({ user: this.props.user });
  }

  radioCheck(e) {
    console.log("radiocheck");
    if (e.target.value == "house") {
      this.setState(
        {
          homeType: "house",
          suiteNumberValid: true,
          suiteNumber: "",
          gateCode: "",
        } /* ,
        this.validateForm */
      );
    } else {
      this.setState(
        {
          homeType: "apartment",
          suiteNumberValid: false,
          suiteNumber: "",
          gateCode: "",
        } /* ,
        this.validateForm */
      );
    }
  }

  onChange = (e) => {
    if(e.target.style.length != 0){
      this.validation(e)
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.name == "homeType" && e.target.value == "house") {
      this.setState({
        gateCode: "",
        suiteNumber: "",
      });
    }
  };

  onSave = (e) => {
    e.preventDefault();
    console.log("submitted");
    this.validateForm()
    if(this.state.formValid == false){
      return
    }
    const {
      name,
      phone,
      address,
      zipcode,
      gateCode,
      suiteNumber,
      instructions
    } = this.state;
    const updateUser = {
      name,
      phone,
      address,
      zipcode,
      gateCode,
      suiteNumber,
      instructions
    };
    axios
      .patch("http://localhost:8000/edit/" + this.props.user._id, updateUser)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
         this.setState({success: true})
         console.log(res.data)
         const token = res.data.token;
        this.props.userUpdated(token, res.data.user)
        } else if (res.status == 500) {
          console.log("500");
          this.setState({ error: res.response.data.msg, showAlert: true });
        }
      }) 
      .catch((err) => {
        console.log("error with axios request: ", err.response.data.msg);
        this.setState({ error: err.response.data.msg, showAlert: true });
        
      })
      .finally(() => {
        console.log("finally");
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
    this.setState(
       {
        [e.target.name + "Valid"]: valid,
        [e.target.name + "Border"]: border,
      },
      () => this.validateForm()
      );  
  }

  validateForm() {
    const {
      nameValid,
      phoneValid,
      zipcodeValid,
      addressValid,
      suiteNumberValid,
      instructionsValid,
    } = this.state;
    const formValid =
      nameValid &&
      phoneValid &&
      zipcodeValid &&
      addressValid &&
      suiteNumberValid &&
      instructionsValid 
    console.log("formValid ", formValid);
    this.setState({ formValid: formValid });
  }

  render() {
    const user = this.state.user;
    return (
      <Container style={{paddingTop: "10px"}}>
        <h1>Edit </h1>
        <Row style={{ paddingTop: "13px" }}>
          <Col>
            <Alert
              variant="danger"
              show={this.state.showAlert}
              style={{ marginBottom: "5px" }}
            >
              {this.state.error}
            </Alert>
            {
            this.state.success ? 
            <Alert
              variant="success"
              show={this.state.success}
              style={{ marginBottom: "5px" }}
            >
              Updated
            </Alert>
           : <></>
          }
          </Col>
          
        </Row>
        <Form onSubmit={this.onSave}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              onChange={this.onChange}
              onBlur={this.validation}
              placeholder="Enter name"
              style={this.state.nameBorder}
              ref={this.nameTarget}
              value={this.state.name}
            ></Form.Control>
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
          <Form.Group>
            <Form.Label>phone number</Form.Label>
            <Form.Control
              name="phone"
              type="text"
              value={this.state.phone}
              onBlur={this.validation}
              onChange={this.onChange}
              ref={this.phoneTarget}
              style={this.state.phoneBorder}
              placeholder="Enter phone number"
            ></Form.Control>
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
            <Form.Label>address</Form.Label>
            <Form.Control
              name="address"
              type="text"
              onChange={this.onChange}
              placeholder="Address"
              onBlur={this.validation}
              value={this.state.address}
              ref={this.addressTarget}
              style={this.state.addressBorder}
            ></Form.Control>
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
            <Form.Label>zipcode</Form.Label>
            <Form.Control
              name="zipcode"
              type="text"
              onChange={this.onChange}
              placeholder="zip code"
              onBlur={this.validation}
              ref={this.zipcodeTarget}
              style={this.state.zipcodeBorder}
              value={this.state.zipcode}
            ></Form.Control>
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
              onBlur={this.validation}
              onChange={this.radioCheck}
              style={{ flexDirection: "row" }}
            >
              <FormControlLabel
                value="house"
                name="homeType"
                control={<Radio checked={this.state.homeType == "house"} />}
                label="house"
              />
              <FormControlLabel
                value="apartment"
                name="homeType"
                control={<Radio checked={this.state.homeType == "apartment"} />}
                label="apartment"
              />
            </RadioGroup>
            {this.state.homeType === "apartment" ? (
              <Form.Group className="mb-3">
                <Form.Label>Gate Code</Form.Label>
                <Form.Text className="text-muted" style={{ float: "right" }}>
                  if necessary
                </Form.Text>
                <Form.Control
                  type="text"
                  name="gateCode"
                  onChange={this.onChange}
                  placeholder="Enter Gate Code"
                />
                <Form.Label>Suite Number</Form.Label>
                <Form.Control
                  type="text"
                  name="suiteNumber"
                  ref={this.suiteNumberTarget}
                  style={this.state.suiteNumberBorder}
                  onBlur={this.validation}
                  onChange={this.handleChange}
                  placeholder="Enter Suite Number"
                />
                <Overlay
                  transition={Fade}
                  target={this.suiteNumberTarget.current}
                  show={
                    Object.entries(this.state.suiteNumberBorder).length === 1
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
          <Form.Group>
            <Form.Label>Instructions</Form.Label>
            <Form.Control
              name="instructions"
              as="textarea"
              value={this.state.instructions}
              rows="3"
              ref={this.instructionsTarget}
              onBlur={this.validation}
              onChange={this.onChange}
              style={this.state.instructionsBorder}
            ></Form.Control>
          </Form.Group>
          <Row>
            <Col>
            {this.state.formValid && (
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              )}
            </Col>
            <Col>
              <Alert show={this.state.showAlert} variant={"success"}>
                Updated
              </Alert>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default EditUser;
