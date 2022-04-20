import React, { Component } from "react";
import { Alert, Row, Col, Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import "../css/resetPassword.css";
import ModalBox from "../components/ModalBox.js";

class resetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      phone: this.props.phone,
      cPassword: "",
      nPassword: "",
      error: false,
      msg: "",
      modalShow: false,
    };
    this.axiosFunc = this.axiosFunc.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validation = this.validation.bind(this);
  }

  forgotPassword = (e) => {
    e.preventDefault();
    this.setState({
      modalShow: true,
    });
  };

  axiosFunc = () => {
    axios
      .patch("https://juicedhouston.com/sendTemporaryPassword", {
        email: this.state.email,
        phone: this.state.phone,
      })
      .then((res) => {
        this.setState({
          modalShow: false,
        });
      });
  };

  validation() {
    if (this.state.nPassword.length >= 6 && this.state.nPassword.length <= 20) {
      if (this.state.cPassword !== this.state.nPassword) {
        return true; // valid form
      }
    }
    return false;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submit = (e) => {
    e.preventDefault();
    if (this.validation) {
      axios
        .patch("https://juicedhouston.com/resetPassword", {
          email: this.state.email,
          password: this.state.cPassword,
          newPassword: this.state.nPassword,
        })
        .then((res) => {
          if (res.data.error) {
            this.setState({
              error: true,
              msg: res.data.msg,
            });
          } else {
            this.setState({
              error: false,
              msg: res.data.msg,
            });
          }
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    }
  };

  render() {
    if (this.state.email === undefined) return <p>not logged in</p>;
    return (
      <Container style={{ paddingTop: "10px" }}>
        <ModalBox
          show={this.state.modalShow}
          axiosFunc={this.axiosFunc}
          onHide={() => this.setState({ modalShow: false })}
        />
        {this.state.error ? (
          <Row>
            <Col>
              <Alert variant="danger">{this.state.msg}</Alert>
            </Col>
          </Row>
        ) : (
          <></>
        )}
        {this.state.msg.length > 0 && !this.state.error ? (
          <Row>
            <Col>
              <Alert variant="success">{this.state.msg}</Alert>
            </Col>
          </Row>
        ) : (
          <></>
        )}
        <Row>
          <Col>
            <h2 className="title">reset password</h2>
            <Form onSubmit={this.submit}>
              <Form.Group>
                <Form.Label className="labelFont">current password</Form.Label>
                <a className="aFont" onClick={this.forgotPassword}>
                  forgot password?
                </a>
                <Form.Control
                  name="cPassword"
                  type="text"
                  onChange={this.onChange}
                  onBlur={this.validation}
                  placeholder="enter current password"
                  value={this.state.cPassword}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="labelFont">new password</Form.Label>
                <p className="req">between 6 and 20 characters</p>
                <Form.Control
                  name="nPassword"
                  type="text"
                  onChange={this.onChange}
                  onBlur={this.validation}
                  placeholder="enter new password"
                  value={this.state.nPassword}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default resetPassword;
