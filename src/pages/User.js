import React from "react";
import { Container, Row, Col, Jumbotron, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user.user,
      orders: null,
      isLoading: true,
      show: false,
      selectedOrderChange: []
    };
    this.handleClose = this.handleClose.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.availableChanges = this.availableChanges.bind(this)
  }

  componentDidMount() {
    console.log(this.state.user.email);
    axios
      .get(`http://localhost:8000/orders/`, {params: { email: this.state.user.email}})
      .then((res) => {
        console.log("res ", res.data.orders);
        this.setState({ isLoading: false, orders: res.data.orders });
      })
      .catch((err) => console.log("error: ", err));
  }

  handleClose(){
    this.setState({show: false})
  }

  handleShow = (lastDay) => {
    this.setState({show: true, lastDay: lastDay})
  }

  availableChanges(drinksArray, lastDay){
    this.setState({selectedOrderChange: []})
    drinksArray.forEach(drink => {
      if(new Date(drink.deliveryDate) < new Date(lastDay) && drink.delivered == false){
        console.log('here ')
        this.setState(prevState =>
          ({ selectedOrderChange: [...prevState.selectedOrderChange, drink] }))
      }
    });
  }

  renderDates = (lastDay, deliveryDate) => {
    let date = new Date();
    const lastD = new Date(lastDay)
    console.log(typeof(date))
    let dates = []
    const dd = new Date(deliveryDate)
   
    if(date.getHours() >= 16){
      date = date.setDate(date.getDate() + 2)
    }
    if( dd < date){
      dates.push(dd.getMonth()+1 + "/" +
      dd.getDate() + "/" + 
      dd.getFullYear())  
      }
    let nextPossibleDeliveryDate = new Date(date)
    while(nextPossibleDeliveryDate.getMonth() <= lastD.getMonth() &&
    nextPossibleDeliveryDate.getDate() <= lastD.getDate() &&
    nextPossibleDeliveryDate.getFullYear() <= lastD.getFullYear()){
        dates.push(nextPossibleDeliveryDate.getMonth()+1 + "/" +
        nextPossibleDeliveryDate.getDate() + "/" + 
        nextPossibleDeliveryDate.getFullYear())
        nextPossibleDeliveryDate = nextPossibleDeliveryDate.setDate(nextPossibleDeliveryDate.getDate() + 1)
        nextPossibleDeliveryDate = new Date(nextPossibleDeliveryDate)
    }
    return dates
  }

  render() {
    if (this.state.isLoading) {
      return <div className="App" style={{ marginTop: "10px", 
      backgroundColor: "rgb(255, 255 ,240)",
    }}></div>;
    }
    if(this.state.user.email == undefined) return <p>not logged in</p>
    return (
      <Container  style={{ marginTop: "10px", 
      backgroundColor: "rgb(255, 255 ,240)",
    }}>
        <br />
        <Jumbotron style={{ padding: "10px", marginBottom: "5px" }}>
          <Container fluid>
            <Row className="justify-content-between">
              <Col className="col-auto">
                <h2>{this.state.user.name}</h2>
                <h3>
                  {this.state.user.address}, {this.state.user.zipcode}
                </h3>
                <h4>{this.state.user.phone.toString().substring(0,3)}
                -{this.state.user.phone.toString().substring(3,6)}
                -{this.state.user.phone.toString().substring(6,10)}</h4>
                {this.state.user.instructions != "" ? <p>Instructions: {this.state.user.instructions}</p>
                : <></>}
                <Link
                  to={{
                    pathname: "/edit",
                    state: { user: this.state.user },
                  }}
                >
                  Edit
                </Link>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <Row>
          <Col xs={12} sm={12} md={8} style={{}}>
           <h3> Order History </h3>
            {this.state.orders.map((o, i) => (
              <>
                <Row>
                  <p style={{ paddingTop: "5px", marginBottom: 0 }}>
                    Order Placed on {o.orderPlaced}
                  </p>
                  { new Date(o.createdAt) < new Date(o.lastDay)  ?
                  <Button
                    style={{ position: "absolute", right: "0" }}
                    size="sm" onClick={() => { this.handleShow(o.lastDay); this.availableChanges(o.drinkss, o.lastDay)}}
                  >
                    Change Delivery Dates 
                  </Button> : <></>}
                </Row>
                <Row  style={{marginBottom: "5px"}}>
                  {o.drinks
                    .sort(
                      (a, b) =>
                        new Date(a.deliveryDate) - new Date(b.deliveryDate)
                    )
                    .map((d, ii) => (
                      <Col
                        style={{
                          margin: "5px",
                          backgroundColor: "#87a0b8",
                          opacity: 0.9,
                          borderRadius: "9px",
                          borderStyle: "solid",
                          borderWidth: "2px"
                        }}
                      >
                        <p style={{ fontSize: "14px", marginBottom: "5px" }}>
                          Delivery Date: {d.deliveryDate} {d.delivered ? <p>Delivered</p> : <></>}
                        </p>
                        {Object.keys(d.ingredients).map((k) => (
                          <p style={{ fontSize: "14px", margin: '3px' }}>
                            {k}: {d.ingredients[k]}oz.
                          </p>
                        ))}
                      </Col>
                    ))}
                </Row>
              </>
            ))}
          </Col>
        </Row>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
             (this.state.selectedOrderChange).map((d, i) => <>
              <select>
              { new Date(d.deliveryDate).getMonth == new Date((new Date()).setDate((new Date).getDate() + 1)).getMonth() &&
               new Date(d.deliveryDate).getDate == new Date((new Date()).setDate((new Date).getDate() + 1)).getDate() && 
               new Date(d.deliveryDate).getFullYear == new Date((new Date()).setDate((new Date).getDate() + 1)).getFullYear() ?
                this.renderDates(this.ste.lastDay, d.deliveryDate).map(day => 
                  ( d.deliveryDate == day ? 
                  <option selected>{day}</option> :
                    <option>dat {day}</option>
                )) : <></>
              }
          </select> {Object.keys(d.ingredients).map(key =>
              <p>{key}: {d.ingredients[key]}</p>
            )}
          </>
              )
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default User;
