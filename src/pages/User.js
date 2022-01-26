import React from "react";
import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user.user,
      order: null
    };
  }

  componentDidMount() {
    console.log(this.props.user.name);
    this.props.getUserOrders(this.props.user._id);
        
  }
  orders() {
    this.props.orders.map((o, index) => <p key={index}> pp</p>);
  }

  render() {
    const { loading, userOrders } = this.props;
    
    if (loading) {
      return <div>Loading...</div>;
    }
    const user = this.props.user.user;
    if (user) {
      return (
        <Container fluid style={{ marginTop: "10px" }}>
          <br />
          <Jumbotron style={{ padding: "10px" }}>
            <Container fluid>
              <Row className='justify-content-between'>
                <Col className="col-auto">
                  <h2>{user.name}</h2>
                  <h3>{user.address}, {user.zipcode}</h3>
                  <h4>{user.phone}</h4>
                  <Link
                    to={{
                      pathname: "/edit",
                      state: { user: user },
                    }}
                  >
                    Edit
                  </Link>
                </Col>
                <Col className='col-auto'> 
                  <h2>Payment Method</h2>

                </Col>
              </Row>
            </Container>
          </Jumbotron>
          <Row>
            <Col className="col-6">
              <Row style={{marginLeft: 0, marginRight: 0}}>
                <Col>
                  {userOrders.map((o, index) => (
                    <Row key={index} style={{ backgroundColor: "grey" }}>
                      <Col>
                        <p>August 3 , 2021</p>
                        <p>instructions here.</p>
                        <Row>
                          {o.drinks.map((drink, index) => 
                          <p key={index}>
                          here
                          </p>
                          
                          )}
                        </Row>
                      </Col>
                    </Row>
                  ))}
                </Col>
              </Row>
            </Col>
            <Col className="col-6"> </Col>
          </Row>
        </Container>
      );
    } else {
      return <p>nope</p>;
    }
  }
}

export default User;
