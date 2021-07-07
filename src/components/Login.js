import React, { Component } from 'react'
import {Form, Button, InputGroup, FormControl} from 'react-bootstrap'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   handleSubmit = (evt) => {
    evt.preventDefault();
    const userData = {
        email:this.state.email, password: this.state.password
    };
    console.log(userData);
    this.props.login(userData);
}
render(){
  return(
    
<Form onSubmit={this.handleSubmit} style={{width: 'max-content'}}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control value={this.state.email} onChange={e => {e.stopPropagation(); this.setState({email: e.target.value}); 
                  }}
     type="email" placeholder="Enter email" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control value={this.state.password} onChange={e => this.setState({password: e.target.value})}
    type="password" placeholder="Password" />
  </Form.Group>
  <input type="submit" value="Submit" />
</Form>
  )
}
}
export default Login