import React from "react";
import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }
  render() {
    const user = this.props.user;
    console.log(user)
    
      if(user){ 
      return(<Jumbotron>
        <Container>
          <h1>{user.name}</h1>
          <h2>{user.address}</h2>
          <h2>{user.zipcode}</h2>
          <Link
            to={{
              pathname: "/edit",
              state: {user: user},
            }}
          >
            Edit
          </Link>
        </Container>
      </Jumbotron>
      )}
      else
      {
        return(
            <p>nope</p>
        )}
  }
}

export default User;
