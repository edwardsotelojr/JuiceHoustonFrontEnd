import React, { Component } from "react";
import Item from "../components/Item";
import list from "../MenuList";
import ReactDOM from "react-dom";
import facts, { keywords } from "../Facts";
import {
  Container,
  Row,
  Col,
  Card,
  Tooltip,
  Overlay,
  OverlayTrigger,
  Popover,
  Button,
} from "react-bootstrap";
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

  flipCard = (index) => {
    let isFlipped = [...this.state.isFlipped];
    isFlipped[index] = !isFlipped[index];
    this.setState({ isFlipped });
  };

  w(arrayy){
    console.log(typeof(arrayy))
    var text = ""
    arrayy.forEach(element => {
      console.log(element)
      text = text + "<p style=\"width: 100%\">" + element + "<OverlayTrigger placement='auto' flip={true} delay={{ show: 250, hide: 400 }} overlay={<Tooltip id='button-tooltip'>Simple tooltip</Tooltip>}> <Button variant='success'>Auto Placement</Button></OverlayTrigger>" + "</p>"
    })
    return 
  }

  ww(){
    var words = ['vitamin A', 'vitamin C'];
    // create a regular expression matching any of these words, using 'g' flag to match all instances
    var regexp = new RegExp('(' + words.join('|') + ')', 'ig');
/* 
    document.getElementsByClassName("infoText").each(function(num, elem) {
        var text = $(elem).text();
        // use string.replace with $& notation to indicate whatever was matched
        text = text.replace(regexp, '<span>lmao</span>');
        $(elem).html(text);
    }); */
  }

  componentDidMount() {
    this.ww();
   /*  const ok = document.querySelectorAll("p.infoText");
    console.log(ok)
    var text = "";
    var index;
    var span1,
      span2,
      span3,
      span4 = "";
     for (var i = 0; i < ok.length; i++) {
      text = ok[i].childNodes[0].data;
      keywords.forEach((keyword) => {
        if (text.includes(keyword)) {
        }
        if (text.toLowerCase().includes(keyword)) {
          console.log(ok[i]);
          var tempText = text.toLowerCase();
          //index = tempText.indexOf(keyword);
         // var splitText = text.html().replace(" ", "<span>lololol</span>)
          //console.log(index);
          var keywordd = text.substring(index, index+keyword.length);
          console.log(keywordd);
          index = text.indexOf(keywordd);
          console.log(index)
          //text = text.replace(keywordd, 
          //ok[i].innerHTML = text.replace(keywordd, `<div class="tooltipp">${keywordd}<span class="tooltipptext" id="${keyword}">${this.w(facts[keyword])}</span></div>`);
         /*  ok[i].innerHTML = text.replace(keywordd, `<OverlayTrigger placement="auto"
          flip={true}
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id='button-tooltip'>Simple tooltip</Tooltip>}
        >
          <Button variant="success">Auto Placement</Button>
        </OverlayTrigger>`) 
        //ok[i].innerHTML = y.substring(0,1).toUpperCase() + y.substring(1).toLowerCase();
        }
        if (text.includes(keyword)) {
          index = text.indexOf(keyword);
          text = text.replace(keyword, "");
          console.log(index);
          var keywordd = text.substring(index, index+keyword.length);
          console.log(keywordd);
          index = text.indexOf(keywordd);
          //text = text.replace(keywordd, 
          //ok[i].innerHTML = text.replace(keyword, `<div class="tooltipp">${keywordd}<span class="tooltipptext" id="${keyword}">${this.w(facts[keyword])}</span></div>`);
         /*  ok[i].innerHTML = text.replace(keywordd, `<OverlayTrigger
          placement="auto"
          flip={true}
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip id="button-tooltip">Simple tooltip</Tooltip>}
        >
          <Button variant="success">Auto Placement</Button>
        </OverlayTrigger>`) 

        }
        //ok[i].childNodes[0].data = text;
      });
    }  */
  }

  render() {
    const veggies = new Array(list);
  

    return (
      <Container fluid style={{backgroundColor: 'grey', paddingLeft: "30px"
        , paddingRight: "30px"}}>
        <Row style={{ display: "block", textAlign: "center" }}>
          <h1>Menu</h1>
        </Row>
        <Row className="justify-content-md-center" style={{marginBottom: "5px"}}>
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
              backgroundColor: "white"
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
              xs={8}
              sm={5}
              md={4}
              lg={3}
              key={index}
              style={{
                padding: "5px",
              }}
            >
              <ReactCardFlip
                //onClick={() => this.cardFlip(index)}
                isFlipped={ this.state.isFlipped[index]}
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
                <Container style={{padding: "11px", backgroundColor: item.color,
                border: "solid #eeeeee" , borderRadius: "15px"}}>
                  <Row style={{ margin: "0px 0px 10px 0px" }}>
                    <Col xs={5}>
                      <Card.Img
                        variant="top"
                        //src={item.img}
                        alt=""
                        style={{ marginLeft: '-10px' ,width: "70px", height: "70px" }}
                      />
                    </Col>
                    <Col xs={7} style={{paddingLeft: '0'}}>
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
                  <Row style={{ margin: "0px 0px 0px 0px", paddingBottom: "0px" }}>
                    {item.facts.map((fact, index) => {
                      return <p className="infoText" key={index}>{fact}</p>;
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
                    <img width="30px" height="30px" src={flip}></img>
                  </button>
                  {/* size for the button being absolute in position*/}
                  <Row style={{height: "32px"}}>

                    </Row>
                </Container>

                <div style={{padding: "0 0 0 4px", backgroundColor: "white",
                   border: "solid #eeeeee" , borderRadius: "15px", borderColor: 'black'}}>
                  <h3 style={{fontWeight: 'bold', marginBottom: '-8px'}}>Nutrition Facts</h3>
                  <p style={{marginBottom: 0, fontSize: 'small'}}>2 servings per container</p>

                  <div style={{display: 'block ruby', marginTop: '-8px', height: '22px'}}>
                  <p style={{ padding: 0,  fontSize: 'small', width: '90px'}}>Serving Size</p>
                  <p style={{width: '36px', float: 'right', fontSize: 'small'}}>8 oz.</p>
                  
                  </div>
                  <hr style={{marginTop: 0, marginBottom: 0, backgroundColor: 'black',
                      width: "98%", height: "5px"}}>
                  </hr>
                  <p style={{fontWeight: "bold", margin: 0}}>Amount per serving</p>  
                  <div style={{ margin: 0,display: 'flow-root'}}>
                  <h4 style={{fontWeight: 'bold', marginTop: "-8px", width: "max-content", float: "left",
                    marginBottom: 0}}>Calories</h4>
                  <h3 style={{fontWeight: 'bold', width: "max-content", float: "right",
                    marginRight: '5px', marginTop: '-12px', marginBottom: 0}}>230</h3>
                  </div>
                  <hr style={{marginTop: 0, marginBottom: 0, backgroundColor: 'black',
                      width: "98%", height: "3px"}}>

                  </hr>
                  <div style={{height: "40px"}}></div>
                  <button
                    style={{
                      position: "absolute",
                      right: 0,
                      backgroundColor: "transparent",
                      border: "transparent",
                    }}
                    onClick={() => this.flipCard(index)}
                  >
                    <img width="30px" height="30px" src={flip}></img>
                  </button>
                   {/* size for the button being absolute in position*/}
                   <Row style={{height: "32px"}}>
                  </Row>
                </div>
              </ReactCardFlip>
            </Col>
          ))}
        </Row>
        <Row>
          <p style={{ marginLeft: "10px", fontSize: "15px", width: "100%", marginBottom: "0.4rem"}}>
            references: School of Public Health at Harvard.{" "}
          </p>
          <p style={{ marginLeft: "10px", fontSize: "15px", width: "100%"}}>
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
