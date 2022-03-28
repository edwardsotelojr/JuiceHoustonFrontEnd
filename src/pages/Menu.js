import React, { Component } from "react";
import { list, listt, dailyRecommendation, minerals } from "../MenuList";
import ReactDOM from "react-dom";
import facts, { keywords } from "../Facts";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Menu.css";
import ReactCardFlip from "react-card-flip";
import "../styles/Card.css";
import flip from "../assets/flip.png";
import {getTop6Menu} from "../utils/getNutritionalFacts"
import "./Order.css"
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: list,
      card: {
        border: "1px solid #eeeeee",
        borderRadius: "9px",
        padding: "10px",
        width: "225px",
        height: "290px",
        backgroundColor: "red",
      },
      isFlipped: [false, false],
    };
    this.flipCard = this.flipCard.bind(this);
  }
 
  capitalizeFirstLetter(string) {
    var s = string.charAt(0).toUpperCase() + string.slice(1);
    for (var i = 1; i < s.length; i++) {
      if (s[i] != s[i].toLowerCase()) {
        s = s.slice(0, i) + " " + s.slice(i);
        i = s.length;
      }
    }
    return s;
  }

  getDailyValue(mineral, itemValue){
    let percentage = parseFloat(itemValue.replace(/[^\d.-]/g,''))/parseFloat(dailyRecommendation[mineral].replace(/[^\d.-]/g,''))
    return Math.round(percentage * 100)
  }


  flipCard = (index) => {
    let isFlipped = [...this.state.isFlipped];
    isFlipped[index] = !isFlipped[index];
    this.setState({ isFlipped }, () => console.log('flipped'));
  };

  renderNutritionalFactLabel(currentProduce){
    
    const top6 = getTop6Menu(currentProduce)
    return(
      <div id="nutritionfacts" style={{border: 'none', backgroundColor: "transparent"}}>
      <table cellSpacing={"0"} cellPadding={"0"}>
        <tbody>
          <tr>
            <td>
              <div className="headerr">Nutrition Facts</div>
            </td>
          </tr>
          <tr>
            <td>
                <div className="labellight" style={{marginTop: "-10px"}}>
                 Serving Size 16oz
                </div>
            </td>
          </tr>
          <tr style={{ height: "7px" }}>
            <td bgcolor="#000000"></td>
          </tr>
          <tr>
            <td style={{ fontSize: "7pt", float: "left" }}>
              <div className="line">Amount Per Serving</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="line">
                <div className="label">
                  Calories{" "}
                  <div className="weight">
                    {
                      currentProduce.calories * 16
                    }
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="line">
                <div className="dvlabel" style={{ float: "right" }}>
                  % Daily Value<sup>*</sup>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="line">
                <div className="label">
                  Total Fat{" "}
                  <div className="weight">
                    {Number(currentProduce.totalFat.replace('g', '')) * 16}g 
                  </div>
                </div>
                <div className="dv"></div>
              </div>
            </td>
          </tr>
          <tr></tr>

          <tr>
            <td>
              <div className="line">
                <div className="label">
                  Total Carbohydrates{" "}
                  <div className="weight">
          {Number(currentProduce.totalCarbohydrate.replace('g', '')) * 16}g</div>
                </div>
                <div className="dv"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="indent">
              <div className="line">
                <div className="labellight">
                  Dietary Fiber <div className="weight">0g</div>
                </div>
                <div className="dv">0%</div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="indent">
              <div className="line">
                <div className="labellight">
                  Sugars <div className="weight">  
                    {Number(currentProduce.sugar.replace('g', '')) * 16 }g</div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="line">
                <div className="label">
                  Protein <div className="weight">{Number(currentProduce.protein.replace('g', '')) * 16}g </div>
                </div>
              </div>
            </td>
          </tr>
          <tr style={{ height: "7px" }}>
            <td bgcolor="#000000"></td>
          </tr>
          <tr>
            <td>
              <table
                cellSpacing={"0"}
                cellPadding={"0"}
                border="0"
                className="vitamins"
              >
                <tbody>
                  <tr>
                    <td>{this.capitalizeFirstLetter(top6[0][0])} &nbsp;&nbsp; {top6[0][1].toFixed(1)}%</td>
                    <td align="center">•</td>
                    <td align="right">{this.capitalizeFirstLetter(top6[3][0])} &nbsp;&nbsp; {top6[3][1].toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td>{this.capitalizeFirstLetter(top6[1][0])} &nbsp;&nbsp; {top6[1][1].toFixed(1)}%</td>
                    <td align="center">•</td>
                    <td align="right">{this.capitalizeFirstLetter(top6[4][0])} &nbsp;&nbsp; {top6[4][1].toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td>{this.capitalizeFirstLetter(top6[2][0])} &nbsp;&nbsp; {top6[2][1].toFixed(1)}%</td>
                    <td align="center">•</td>
                    <td align="right">{this.capitalizeFirstLetter(top6[5][0])} &nbsp;&nbsp; {top6[5][1].toFixed(1)}%</td>
                  </tr> 
                  </tbody>
                 </table>
            </td>
          </tr>
          <tr>
            <td>
              <div className="line">
                <div className="labellight">
                  * Based on a regular 2000 calorie diet
                  <br />
                  <br />
                  <i>
                    Nutritional details are an estimate and should only
                    be used as a guide for approximation.
                  </i>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    )
  }

  addHyperText(text, key) {
    var updatedText = (
      <p>
        {text}
        <a href={"d"}>lol</a>
      </p>
    );
    //console.log(updatedText.props.children);

    for (var i = 0; i < keywords.length; i++) {
      if (text.includes(keywords[i])) {
        //console.log(keywords[i]);
      }
    }

    return <p key={key}>{text}</p>;
  }

  render() {
    const veggies = new Array(list);
    let ee = {};
    for (var i=0; i<list.length; i++) {
       if (list[i].name == "Beets"){
        ee = list[i];
       }
    }
    var count = 0; 
    //this.getTopVitaminsNMinerals(ee);
    return (
      <Container
        fluid
        style={{
          backgroundColor: "rgb(255, 255 ,240)",
          paddingLeft: "30px",
          paddingRight: "30px",
        }}
      >
        <Row style={{ display: "block", textAlign: "center" }}>
          <h1>Menu</h1>
        </Row>
        <Row
          className="justify-content-md-center"
          style={{ marginBottom: "5px" }}
        >
          <Col
            style={{
              padding: "8px",
              borderRadius: "15px",
              maxWidth: "500px",
              borderWidth: "3px",
              textAlign: "center",
              borderColor: "red",
              borderStyle: "solid",
              margin: "0 auto",
              backgroundColor: "white",
            }}
          >
            Fiber is very important to your diet and juice does not have any.
          </Col>
        </Row>
        <Row className="justify-content-center">
          {
            //style={{ display: "flex", flexWrap: "wrap" }}>
          }
          {Object.entries(this.state.list).map(([item, info], i) => (
            <Col
              xs={11}
              sm={6}
              md={4}
              lg={3}
              key={i}
              style={{
                padding: "5px",
              }}
            >
              <ReactCardFlip
                //onClick={() => this.cardFlip(index)}
                isFlipped={this.state.isFlipped[i]}
                flipDirection="horizontal"
                containerStyle={{
                  zIndex: 1,
                  //borderRadius: "9px",
                  //padding: "10px",
                  //width: "225px",
                  //height: "290px",
                  backgroundColor: item.color,
                  opacity: 0.92
                }}
              >
                <Container
                  style={{
                    padding: "11px",
                    backgroundColor: info.color,
                    border: "solid #eeeeee",
                    borderRadius: "15px",
                  }}
                >
                  <Row style={{ margin: "0px 0px 10px 0px" }}>
                    <Col xs={5}>
                      <Card.Img
                        variant="top"
                        src={info.img}
                        alt=""
                        style={{
                          marginLeft: "-10px",
                          width: "60px",
                          height: "60px",
                          borderRadius: "18px",
                        }}
                      />
                    </Col>
                    <Col xs={7} style={{ paddingLeft: "0" }}>
                      <Card.Title style={{ fontSize: "1.1rem", marginBottom: "0.35rem"}}>
                        {item}
                      </Card.Title>
                      <Card.Subtitle
                      style={{}}
                    >
                      ${info.costPerOunce} / oz.
                    </Card.Subtitle>
                    </Col>{" "}
                  </Row>
                  <Row style={{ margin: "0px 0px 10px 0px" }}>
                   
                  </Row>
                  <Row
                    style={{
                      margin: "0px 0px 0px 0px",
                      paddingBottom: "0px",
                      height: "170px",
                      overflow: "scroll",
                    }}
                  >
                    {info.facts.map((fact, index) => {
                      return this.addHyperText(fact, index);
                    })}
                  </Row>
                  <button
                    style={{
                      position: "absolute",
                      right: 0,
                      backgroundColor: "transparent",
                      border: "transparent",
                    }}
                    onClick={() => this.flipCard(i)}
                  >
                    <img width="40px" height="40px" src={flip}></img>
                  </button>
                  {/* size for the button being absolute in position*/}
                  <Row style={{ height: "32px" }}></Row>
                </Container>

                <div
                 onClick={() => this.flipCard(i)}
                  style={{
                    padding: "0 0 0 4px",
                    backgroundColor: "white",
                    border: "solid #eeeeee",
                    borderRadius: "15px",
                    borderColor: "black",
                    height: "auto",
                  }}
                >
                  {this.renderNutritionalFactLabel(listt[item])}
                </div>
              </ReactCardFlip>
            </Col>
          ))}
        </Row>
        <Row>
          <u
            style={{
              marginLeft: "10px",
              fontSize: "12px",
              width: "100%",
              marginBottom: 0,
            }}
          >
            references
          </u>
          <p
            style={{
              marginLeft: "10px",
              fontSize: "12px",
              width: "100%",
              marginBottom: "0.3rem",
            }}
          >
            School of Public Health at Harvard{" "}
          </p>
          <p style={{marginBottom: "0.3rem", marginLeft: "10px", fontSize: "12px", width: "100%" }}>
            National Institutes of Health, Office of Dietary Supplements{" "}
          </p>

          <p style={{marginBottom: "0.3rem", marginLeft: "10px", fontSize: "12px", width: "100%" }}>
            Medical News Today{" "}
          </p>
          <p style={{ marginLeft: "10px", fontSize: "12px", width: "100%" }}>
            Healthline{" "}
          </p>
        </Row>
      </Container>
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
