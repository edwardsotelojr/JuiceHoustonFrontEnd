import React, { Component } from "react";
import { Alert, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(userData);
    this.props.login(userData);
  };

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        style={{ width: "max-content", padding: "1px 15px 1px 15px" }}
      >
        {this.props.error ? (
          <Alert style={{ marginBottom: 0 }} variant={"danger"}>
            {this.props.error.response.data.msg}
          </Alert>
        ) : null}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={this.state.email}
            onChange={(e) => {
              e.stopPropagation();
              this.setState({ email: e.target.value });
            }}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" style={{marginBottom: '0.5rem'}}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <input type="submit" value="login" style={{ borderRadius: "4px", padding: "7px", backgroundColor: "#9bd16e" }} />
        <Link
          style={{ paddingLeft: "10px", color: "#9bd16e"}}
          to="/Signup"
          onClick={() =>
            (document.querySelector(".dropdown-menu.show").style.display =
              "none")
          }
        >
          signup
        </Link>
      </Form>
    );
  }
}
export default Login;
