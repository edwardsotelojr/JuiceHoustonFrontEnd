import React, { Component } from "react";
import list, { dailyRecommendation, minerals } from "../MenuList";
import ReactDOM from "react-dom";
import facts, { keywords } from "../Facts";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Menu.css";
import ReactCardFlip from "react-card-flip";
import "../styles/Card.css";
import flip from "../assets/flip.png";
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
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
  
  //get vitamins and minerals that are high in daily recommendation value
  getTopVitaminsNMinerals(obj) {
    var result = [];
    var top3 = new Array(3);
    for(const property in obj.vitamins){
    for (const value in dailyRecommendation) {
      if (value == property){
        //console.log(parseFloat(obj.vitamins[property].replace(/[^\d.-]/g,''))/parseFloat(dailyRecommendation[value].replace(/[^\d.-]/g,'')))
        result.push({name: property, amount: obj.vitamins[property], percent: parseFloat(obj.vitamins[property].replace(/[^\d.-]/g,''))/parseFloat(dailyRecommendation[value].replace(/[^\d.-]/g,''))})
      }
    }
  }
  top3 = result.sort(function(a, b) {
    return b.percent - a.percent;
  });

  console.log('top 3: ', top3[0], " ", top3[1], " ", top3[2]);
  return top3.slice(0,3);
}

  flipCard = (index) => {
    let isFlipped = [...this.state.isFlipped];
    isFlipped[index] = !isFlipped[index];
    this.setState({ isFlipped });
  };

  componentDidMount() {}

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
    this.getTopVitaminsNMinerals(ee);
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
          {this.state.list.map((item, index) => (
            <Col
              xs={11}
              sm={6}
              md={4}
              lg={3}
              key={index}
              style={{
                padding: "5px",
              }}
            >
              <ReactCardFlip
                //onClick={() => this.cardFlip(index)}
            isFlipped={this.state.isFlipped[index]}
                flipDirection="horizontal"
                containerStyle={{
                  zIndex: 1,
                  //borderRadius: "9px",
                  //padding: "10px",
                  //width: "225px",
                  //height: "290px",
                  //backgroundColor: item.color,
                }}
              >
                <Container
                  style={{
                    padding: "11px",
                    backgroundColor: item.color,
                    border: "solid #eeeeee",
                    borderRadius: "15px",
                  }}
                >
                  <Row style={{ margin: "0px 0px 10px 0px" }}>
                    <Col xs={5}>
                      <Card.Img
                        variant="top"
                        src={item.img}
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
                      <Card.Title style={{ fontSize: "1.1rem" }}>
                        {item.name}
                      </Card.Title>
                    </Col>{" "}
                  </Row>
                  <Row style={{ margin: "0px 0px 10px 0px" }}>
                    <Card.Subtitle
                      className="text-muted"
                      style={{ paddingLeft: "13px" }}
                    >
                      ${item.costPerOunce} / oz.
                    </Card.Subtitle>
                  </Row>
                  <Row
                    style={{
                      margin: "0px 0px 0px 0px",
                      paddingBottom: "0px",
                      height: "170px",
                      overflow: "scroll",
                    }}
                  >
                    {item.facts.map((fact, index) => {
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
                    onClick={() => this.flipCard(index)}
                  >
                    <img width="40px" height="40px" src={flip}></img>
                  </button>
                  {/* size for the button being absolute in position*/}
                  <Row style={{ height: "32px" }}></Row>
                </Container>

                <div
                 onClick={() => this.flipCard(index)}
                  style={{
                    padding: "0 0 0 4px",
                    backgroundColor: "white",
                    border: "solid #eeeeee",
                    borderRadius: "15px",
                    borderColor: "black",
                    height: "auto",
                  }}
                >
                  
                  <h3 style={{ fontWeight: "bold", marginBottom: "-8px" }}>
                    Nutrition Facts
                  </h3>
                  <p style={{ marginBottom: 0, fontSize: "small" }}>
                    1 servings per ounce
                  </p>

                  <div
                    style={{
                      display: "block ruby",
                      marginTop: "-8px",
                      height: "22px",
                    }}
                  >
                    <p style={{ marginBottom: 0, padding: 0, float: 'left', fontSize: "small", width: "90px" }}>
                      Serving Size
                    </p>
                    <p
                      style={{
                        marginBottom: 0,
                        width: "36px",
                        float: "right",
                        fontSize: "small",
                      }}
                    >
                      1 oz.
                    </p>
                  </div>
                  <hr
                    style={{
                      marginTop: 0,
                      marginBottom: 0,
                      backgroundColor: "black",
                      width: "98%",
                      height: "5px",
                    }}
                  ></hr>
                  <p style={{ fontWeight: "bold", margin: 0 }}>
                    Amount per serving
                  </p>
                  <div style={{ margin: 0, display: "flow-root" }}>
                    <h4
                      style={{
                        fontWeight: "bold",
                        marginTop: "-8px",
                        width: "max-content",
                        float: "left",
                        marginBottom: 0,
                      }}
                    >
                      Calories
                    </h4>
                    <h3
                      style={{
                        fontWeight: "bold",
                        width: "max-content",
                        float: "right",
                        marginRight: "5px",
                        marginTop: "-12px",
                        marginBottom: 0,
                      }}
                    >
                      {item.calories}
                    </h3>
                  </div>

                  <hr
                    style={{
                      marginRight: "6px",
                      marginTop: 0,
                      marginBottom: 0,
                      backgroundColor: "black",
                      width: "98%",
                      height: "3px",
                    }}
                  ></hr>
                  <div style={{ display: "flow-root", marginRight: "8px" }}>
                    <b style={{ float: "right" }}>% Daily Value</b>
                  </div>
                  <hr
                    style={{
                      marginRight: "6px",
                      marginTop: 0,
                      marginBottom: 0,
                      backgroundColor: "black",
                      width: "98%",
                      height: "1px",
                    }}
                  />
                  <div style={{ display: "flow-root" }}>
                    <b>Total Fat</b> {item.totalFat}{" "}
                    <b style={{ float: "right", marginRight: "8px" }}>{this.getDailyValue('totalFat', item.totalFat)}%</b>
                  </div>
                  <hr
                    style={{
                      marginRight: "6px",
                      marginTop: 0,
                      marginBottom: 0,
                      backgroundColor: "black",
                      width: "98%",
                      height: "1px",
                    }}
                  />
                  <div style={{ display: "flow-root" }}>
                    <b>Total Carbohydrate</b> {item.totalCarbohydrate}{" "}
                    <b style={{ float: "right", marginRight: "8px" }}>{this.getDailyValue('totalCarbohydrate', item.totalCarbohydrate)}%</b>
                  </div>
                  <hr
                    style={{
                      marginRight: "6px",
                      marginTop: 0,
                      marginBottom: 0,
                      backgroundColor: "black",
                      width: "98%",
                      height: "1px",
                    }}
                  />
                  <div style={{ display: "flow-root" }}>
                    <p
                      style={{
                        float: "left",
                        marginLeft: "25px",
                        marginRight:"4px",
                        marginBottom: 0,
                      }}
                    >
                      Dietary Fiber
                    </p>{" "}
                    0g
                    <b style={{ float: "right", marginRight: "8px" }}>0%</b>
                  </div>
                  <hr
                    style={{
                      marginRight: "6px",
                      marginTop: 0,
                      marginBottom: 0,
                      backgroundColor: "black",
                      width: "98%",
                      height: "1px",
                    }}
                  />
                  <div style={{ display: "flow-root" }}>
                    <p
                      style={{
                        float: "left",
                        marginLeft: "25px",
                        marginRight:"4px",
                        marginBottom: 0,
                      }}
                    >
                      Sugar 
                    </p>
                    {item.sugar}
                  </div>
                  <hr
                    style={{
                      marginRight: "6px",
                      marginTop: 0,
                      marginBottom: 0,
                      backgroundColor: "black",
                      width: "98%",
                      height: "1px",
                    }}
                  />
                  <div style={{ display: "flow-root" }}>
                    <b>Protein</b> {item.protein}
                  </div>
                  <hr
                    style={{
                      marginRight: "6px",
                      marginTop: 0,
                      marginBottom: 0,
                      backgroundColor: "black",
                      width: "98%",
                      height: "8px",
                    }}
                  />
                  {this.getTopVitaminsNMinerals(item).map((mineral)=> (
                    
                    <div style={{ display: "flow-root" }}>
                    <p
                      style={{
                        float: "left",
                        marginLeft: "1px",
                        marginBottom: 0,
                      }}
                    >
                      {minerals[mineral.name]} {mineral.amount}
                    </p>
                    <p
                      style={{
                        float: "right",
                        marginRight: "8px",
                        marginBottom: 0,
                      }}
                    >
                      {Math.round(mineral.percent*100)}%
                    </p>
                  </div>
                  ))}
                  <button
                    style={{
                      position: "absolute",
                      right: 0,
                      backgroundColor: "transparent",
                      border: "transparent",
                    }}
                   // onClick={() => this.flipCard(index)}
                  >
                    {/*<img width="40px" height="40px" src={flip}></img>*/}
                  </button>
                  {/* size for the button being absolute in position*/}
                 
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
            School of Public Health at Harvard.{" "}
          </p>
          <p style={{ marginLeft: "10px", fontSize: "12px", width: "100%" }}>
            National Institutes of Health, Office of Dietary Supplements.{" "}
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
