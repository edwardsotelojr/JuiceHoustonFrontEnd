import React, { Component } from "react";
import Item from "../components/Item";
import list from "../MenuList";
import { Card } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";
import "../styles/Card.css";
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
      list: list,
      card: {
        border: "1px solid #eeeeee",
        borderRadius: "3px",
        padding: "15px",
        width: "250px",
      },
      isFlipped: [false, false],
    };
    this.flipCard = this.flipCard.bind(this);
  }

  flipCard = (index) => {
    let isFlipped = [...this.state.isFlipped];
    isFlipped[index] = !isFlipped[index];
    this.setState({ isFlipped });
  };

  render() {
    const veggies = new Array(list);
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {this.state.list.map((item, index) => (
          <div key={index}>
          <ReactCardFlip
            //onClick={() => this.cardFlip(index)}
            isFlipped={this.state.isFlipped[index]}
            flipDirection="horizontal"
            containerStyle={this.state.card}
          >
            <div style={this.state.item}>
              <Card.Img
                variant="top"
                //src={item.img}
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
              <Card.Title>{item.default.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">${item.default.pricePerOz}</Card.Subtitle>
              <Card.Text>{item.default.benefits}</Card.Text>

              <button onClick={() => this.flipCard(index)}>Flip Card</button>
            </div>

            <div style={this.state.item} className="card">
              <h1>fsd</h1>

              <button onClick={() => this.flipCard(index)}>Flip Card</button>
            </div>
          </ReactCardFlip>
          </div>
        ))}
      </div>
    );
  }
}

export default Menu;

/*
  <YOUR_FRONT_CCOMPONENT>
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src="holder.js/100px180?text=Image cap"
                  />
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text>{item.benefits}</Card.Text>
                </Card.Body>{" "}
              </YOUR_FRONT_CCOMPONENT>

              <YOUR_BACK_COMPONENT>
                This is the back of the card.
                <button onClick={this.handleClick}>Click to flip</button>
              </YOUR_BACK_COMPONENT>
              */
