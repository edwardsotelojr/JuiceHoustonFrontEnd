import { Container, Form, Button } from "react-bootstrap";
import React from "react";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
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
    }));
  };

  onSave = () => {
    this.props.editUser(this.state.user)
    console.log("onSave ", this.state.user._id)

  }

  render() {
    const user = this.props.user;
    console.log(user);

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
          <Button variant="primary" onClick={this.onSave}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default EditUser;
