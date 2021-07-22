import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import React from "react";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      showAlert: false
    }
  }
  componentDidMount(){
    this.setState({user: this.props.user})

  }

  onChange = (e) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [e.target.name]: e.target.value,
      },
    }),  this.validation);
  };

  validation = () => {
    console.log('phon')
   
  }

  onSave = () => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        zipcode: parseInt(prevState.user.zipcode),
      },
    }), () => {
      this.props.editUser(this.state.user);
      console.log("onSave: ", this.state.user);
    }
  );
}

  render() {
    const user = this.state.user;

    return (
      <Container>
        <h1>Edit </h1>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              defaultValue={user.name}
              onChange={this.onChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>address</Form.Label>
            <Form.Control
              name="address"
              type="text"
               defaultValue={user.address}
               onChange={this.onChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>zipcode</Form.Label>
            <Form.Control
              name="zipcode"
              type="text"
               defaultValue={user.zipcode}
               onChange={this.onChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>phone number</Form.Label>
            <Form.Control
              name="phone"
              type="text"
               defaultValue={user.phone}
               onChange={this.onChange}
            ></Form.Control>
          </Form.Group>
          <Row>
            <Col>
          <Button variant="primary" onClick={this.onSave}>
            Submit
          </Button>
          </Col>
          <Col>
          <Alert show={this.state.showAlert} variant={'success'}>Updated</Alert>
          </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

export default EditUser;
