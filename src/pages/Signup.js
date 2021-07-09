import React, { Component } from "react";
import { Container, Form, Button, Row } from "react-bootstrap";
import geocoder from "google-geocoder";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      address: "",
      zipcode: "",
      homeType: "",
      suiteNumber: "",
      gateCode: "",
      phone: "",
      password: "",
      password2: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    var geo = geocoder({
      key: "AIzaSyAqBlhajPerTHQOCOLdB8p8C1JF7w3Yc4Q",
    });
    /*  geo.find('217 Joyce st', function(err, res){
      if(err){
        console.log('err ', err)
      }else{
        console.log('res ', res)
        res.forEach(element => {
          if(element.postal_code.long_name == "77009"){
            console.log('true')
          }
          
        });
      }
    }) */
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;
    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };
    this.props.signup(newUser, this.props.history);
  };

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
  }

  render() {
    const { errors } = this.state;

    // newBounds.extend(new LatLng({ latitude: 29.651783, longitude: -95.519794}),
    //   new LatLng({latitude: 29.960267, longitude: -95.223487}));

    return (
      <Container>
        <Form onSubmit={this.onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={this.handleChange}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={this.handleChange}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={this.handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={this.handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              onChange={this.handleChange}
              placeholder="Enter phone number"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              onChange={this.handleChange}
              placeholder="Address"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Zipcode</Form.Label>
            <Form.Control
              type="text"
              name="zipcode"
              onChange={this.handleChange}
              placeholder="zip code"
            />
          </Form.Group>
          <Form.Group>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              onChange={this.handleChange}
              style={{ flexDirection: "row" }}
            >
              <FormControlLabel
                value="house"
                name="homeType"
                control={<Radio />}
                label="house"
              />
              <FormControlLabel
                value="apartment"
                name="homeType"
                control={<Radio />}
                label="apartment"
              />
            </RadioGroup>
            {this.state.homeType == "apartment" && (
              <Row>
                <Form.Label>Gate Code</Form.Label>
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
                  onChange={this.handleChange}
                  placeholder="Enter Suite Number"
                />
              </Row>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Instruction for delivery</Form.Label>
            <Form.Text className="text-muted" style={{ float: "right" }}>
                Drink will be place in a shaded area to keep it cool
            </Form.Text>
            <Form.Control
              type="text"
              name="instruction"
              onChange={this.handleChange}
              placeholder="Instruction for delivery"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
export default Signup;
