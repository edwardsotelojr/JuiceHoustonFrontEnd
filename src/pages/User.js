import React from "react";
import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user.user
    };
  }

  componentDidMount(){
    this.props.getUserOrders(this.state.user._id);
  }
   orders(){ 
     this.props.orders.map((o, index) => 
      
        <p key={index}> pp</p>
      )
   }

  render() {
    const { loading, userOrders } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }
    const user = this.props.user.user;
    if (user) {
      return (
        <Container>
        <Jumbotron>
          <Container>
            <h1>{user.name}</h1>
            <h2>{user.address}</h2>
            <h2>{user.zipcode}</h2>
            <Link
              to={{
                pathname: "/edit",
                state: { user: user },
              }}
            >
              Edit
            </Link>
          </Container>
        </Jumbotron>
        <Row>
          {userOrders.map((o, index) => 
      
      <p key={index}>pp</p>
    )}
        </Row>
        </Container>
      );
    } else {
      return <p>nope</p>;
    }
  }
}

export default User;
