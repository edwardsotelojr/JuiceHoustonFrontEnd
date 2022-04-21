import React, { Component } from "react";
import { list, listt, dailyRecommendation } from "../MenuList";
import capitalizeFirstLetter from '../utils/capitalFirstLetter'
import { Container, Row, Col, Card } from "react-bootstrap";
import "../css/Menu.css";
import ReactCardFlip from "react-card-flip";
import "../css/Card.css";
import flip from "../assets/flip.png";
import {getTop6Menu} from "../utils/getNutritionalFacts"
import "../css/Order.css"
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
                    <td>{capitalizeFirstLetter(top6[0][0])} &nbsp;&nbsp; {top6[0][1].toFixed(1)}%</td>
                    <td align="center">•</td>
                    <td align="right">{capitalizeFirstLetter(top6[3][0])} &nbsp;&nbsp; {top6[3][1].toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td>{capitalizeFirstLetter(top6[1][0])} &nbsp;&nbsp; {top6[1][1].toFixed(1)}%</td>
                    <td align="center">•</td>
                    <td align="right">{capitalizeFirstLetter(top6[4][0])} &nbsp;&nbsp; {top6[4][1].toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td>{capitalizeFirstLetter(top6[2][0])} &nbsp;&nbsp; {top6[2][1].toFixed(1)}%</td>
                    <td align="center">•</td>
                    <td align="right">{capitalizeFirstLetter(top6[5][0])} &nbsp;&nbsp; {top6[5][1].toFixed(1)}%</td>
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

  render() {
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
                isFlipped={this.state.isFlipped[i]}
                flipDirection="horizontal"
                containerStyle={{
                  zIndex: 1,
                  backgroundColor: item.color + "80",
                }}
              >
                <Container
                  style={{
                    padding: "9px",
                    backgroundColor: info.color + "90",
                    border: "solid #eeeeee",
                    borderRadius: "15px",
                  }}
                >
                  <Row style={{ margin: "0px 0px 10px 0px" }}>
                    <Col xs={"auto"} style={{paddingLeft: '0px', paddingRight: "0px"}} >
                      <Card.Img
                        variant="top"
                        src={info.img}
                        alt=""
                        style={{
                          width: "53px",
                          height: "57px",
                          borderRadius: "18px",
                        }}
                      />
                    </Col>
                    <Col xs={"auto"} style={{ paddingLeft: "4px", paddingRight: "0px" }}>
                      <Card.Title style={{ fontSize: "1.05rem", marginBottom: "0.35rem"}}>
                        {item}
                      </Card.Title>
                      <Card.Subtitle
                      style={{}}
                    >
                      ${Number(info.costPerOunce).toFixed(2)} / oz. 
                      <p style={{fontSize: "12px", margin: 0}}>{info.taste ? info.taste : ""}</p>
                    </Card.Subtitle>
                    </Col>
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
                      return <p key={index}>{fact}</p>                    })}
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
                    <img width="40px" height="40px" src={flip} alt="flip icon"></img>
                  </button>
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
