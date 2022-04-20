import React, { Component } from "react";
import { Container, Button, Col, Row, Alert } from "react-bootstrap";
import "../css/Verify.css";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import history from "../history";

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      n1: "",
      n2: "",
      n3: "",
      n4: "",
      error: false,
      match: false,
      msg: "d",
      showSignup: false,
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.isReady = this.isReady.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
  }

  componentDidMount() {
    window.scrollTo({
      top: 0,
    });
  }
  isReady = () => {
    if (
      parseInt(this.state.n1) > -1 &&
      parseInt(this.state.n2) > -1 &&
      parseInt(this.state.n3) > -1 &&
      parseInt(this.state.n4) > -1
    ) {
      this.setState({
        ready: true,
      });
    } else {
      this.setState({
        ready: false,
      });
    }
  };

  keyPress(e) {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
    if (e.key === "Enter") {
      if (this.state.ready === true) {
        this.verifyUser();
      }
    }
  }

  handleTextChange(e) {
    const id = parseInt(e.target.name[1]);
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => this.isReady()
    );
    if (e.target.value === "") {
      return;
    }
    if (id < 5) {
      // Get the next input field using it's name
      const nextfield = document.querySelector(`input[name="n${id + 1}"]`);
      // If found, focus the next field
      if (nextfield !== null) {
        nextfield.focus();
        nextfield.select();
      }
    }
  }

  verifyUser = () => {
    axios
      .patch("https://juicedhouston.com/verify", {
        pin: this.state.n1 + this.state.n2 + this.state.n3 + this.state.n4,
        userEmail: this.props.location.state.email,
      })
      .then((res) => {
        if (res.data.msg === "pin matched") {
          this.setState({ error: false, match: true, msg: res.data.msg });
          localStorage.setItem("jwtToken", res.data.token);
          // Set token to Auth header
          setAuthToken(res.data.token);
          // Decode token to get user data
          const decoded = jwt_decode(res.data.token);
          // Set current user
          this.props.setCurrentUser(decoded.user);
        } else if (res.data.msg === "incorrect pin") {
          this.setState({
            error: true,
            msg: res.data.msg + ". " + res.data.attemptsLeft + " attempt left.",
          });
          console.log("pin is not a match");
        } else if (res.data.msg === "user not founded.") {
          this.setState({ error: true, msg: res.data.msg, showSignup: true });
        } else if (res.data.msg === "user is deleted") {
          this.setState({
            error: true,
            match: false,
            msg: res.data.msg,
            showSignup: true,
          });
        } else if (res.data.msg === "error to delete user") {
        } else {
          this.setState({
            error: true,
            match: false,
            msg: res.data.msg,
            showSignup: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        if (this.state.match) {
          history.push("/user");
        }
      });
  };

  render() {
    return (
      <Container fluid style={{ height: "100vh", backgroundColor: "#fffced" }}>
        <Row style={{ height: "20px" }} />
        {this.state.error ? (
          <Row className="justify-content-center">
            <Alert
              variant={"danger"}
              style={{ margin: 0, marginBottom: "5px" }}
            >
              {this.state.msg}
            </Alert>
          </Row>
        ) : (
          <></>
        )}
        {this.state.showSignup ? (
          <Row className="justify-content-center">
            <button onClick={() => history.goBack()}>Go Back</button>
          </Row>
        ) : (
          <></>
        )}

        {this.state.match ? (
          <Row className="justify-content-center">
            <Alert
              variant={"success"}
              style={{ margin: 0, marginBottom: "5px" }}
            >
              {this.state.msg}
            </Alert>
          </Row>
        ) : (
          <></>
        )}
        <Row className="justify-content-center">
          <Col className="align-self-center" xs="auto">
            <p style={{ marginBottom: "5px" }}>Enter Verification Code</p>{" "}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="align-self-center" xs="auto">
            <input
              className="inputField"
              type="text"
              name="n1"
              value={this.state.n1}
              onKeyPress={this.keyPress}
              maxLength={"1"}
              onChange={this.handleTextChange}
            />
            <input
              type="text"
              className="inputField"
              name="n2"
              value={this.state.n2}
              onKeyPress={this.keyPress}
              maxLength={"1"}
              onChange={this.handleTextChange}
            />
            <input
              type="text"
              className="inputField"
              name="n3"
              value={this.state.n3}
              onKeyPress={this.keyPress}
              maxLength={"1"}
              onChange={this.handleTextChange}
            />
            <input
              type="text"
              className="inputField"
              name="n4"
              onKeyPress={this.keyPress}
              value={this.state.n4}
              maxLength={"1"}
              onChange={this.handleTextChange}
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Button
            disabled={!this.state.ready}
            style={{ marginTop: "5px" }}
            onClick={this.verifyUser}
          >
            Verify
          </Button>
        </Row>
      </Container>
    );
  }
}
export default Verify;
