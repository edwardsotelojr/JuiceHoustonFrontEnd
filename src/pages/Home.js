import React, { useEffect } from "react";
import porch from "../assets/porch.png";
import one from "../assets/one.png";
import two from "../assets/two.png";
import three from "../assets/three.png";
import Item from "../components/Item";
import AOS from "aos";
import axios from 'axios'
import "../components/Item.css";
import { Divider, TextField } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { Container, Row, Col, DropdownButton, Dropdown, Button } from "react-bootstrap";
import "./Home.css";
import juices from "../assets/Juices.png";
import masked from "../assets/masked.png";
import tasty from "../assets/tasty.png";
import juicer from "../assets/juicer.png";
import juice from "../assets/juice.png";
import jsxToString from 'jsx-to-string'
const zipcodes = [
  77003, 77004, 77007, 77008, 77009, 77011, 77012, 77016, 77018, 77019, 77020,
  77021, 77022, 77023, 77024, 77026, 77027, 77028, 77030, 77036, 77037, 77039,
  77040, 77042, 77050, 77054, 77055, 77057, 77063, 77076, 77080, 77087, 77088,
  77091, 77092, 77093, 77096, 77098, 77201, 77401,
];

function htmll(){
  const p = "ed"
  return(
    <html>
   {/*  <style>
        p {
            margin-bottom: 5px;
        }
      div p {
        font-family: 'Courier New', Courier, monospace;
        padding: 0;
        margin: 0;
      }
    </style> */}
    <body style='background-color: rgb(255, 248, 215)'>
      <h1
        style='
          text-align: center;
         font-size: 25px;
          margin-bottom: 0;
        '
      >
        thank you for trying juice houston! {p}
      </h1>
      <p style='text-align: center'>your order number is 123</p>
      <p>address: 217 joyce st</p>
      <p>instructions: none</p>
      <p>4 juices</p>
      <div style='border: solid; width: max-content; border-radius: 10px; padding: 2px'>
        <p>delivery date: june 1</p>
        <p>4oz fuji apple</p>
        <p>5oz red grapes</p>
        <p>$5.20</p>
      </div>
      <p>total was $18.90</p>
    </body>
  </html>
  
  )
}

function Home() {
  useEffect(() => {
    // Update the document title using the browser API
    window.scrollTo(0, 0);
  });

  AOS.init();
  return (
    <article
      style={{
        scrollSnapType: "y mandatory",
        overflow: "scroll",
        width: "100vw",
        height: "190vh",
        background: "linear-gradient(180deg, #04c207 -10%, #7c73ff 90%, #364bb5 100%)"
      }}
    >
      <section className="one">
        <div
          data-aos="fade-up"
          data-aos-duration="1200"
          style={{ paddingTop: "19px", textAlign: "center" }}
        >
          <h3 style={{}}>Juice Houston</h3>
          <div className="item_des" style={{ textAlign: "center" }}>
            <p> Customize Fresh Juice deliver to you early in the morning</p>
            <Container fluid style={{ marginTop: "0px" }}>
              <Row>
                <Col xs={12} sm={12} md={4}>
                  <div
                    className="item_text phone"
                    data-aos="fade-up"
                    style={{
                      marginTop: "10px",
                      fontSize: "25px",
                      display: "inline-block",
                    }}
                    data-aos-duration="1500"
                    data-aos-delay="1000"
                    data-aos-once="true"
                    data-aos-mirror="false"
                  >
                    <img
                      className="numberBox"
                      src={one}
                      height="18px"
                      width="18px"
                    />
                    <p style={{ float: "left", marginBottom: "2px" }}>
                      Create your juices
                    </p>
                    <img
                      height={48}
                      width={48}
                      src={juices}
                      style={{ float: "right" }}
                    />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={4}>
                  <div
                    className="item_text"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                    data-aos-once="true"
                    data-aos-mirror="false"
                    style={{
                      marginTop: "5px",
                      transitionDelay: "3.0s",
                      fontSize: "25px",
                      display: "inline-block",
                    }}
                  >
                    <img
                      src={two}
                      height="18px"
                      width="18px"
                      className="numberBox"
                    />
                    <p style={{ marginBottom: "2px" }}>
                      Select the days you want your juices deliver in the
                      morning
                    </p>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={4}>
                  <div
                    className="item_text"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                    data-aos-once="true"
                    data-aos-mirror="false"
                    style={{
                      marginTop: "5px",
                      transitionDelay: "5s",
                      fontSize: "25px",
                      display: "inline-block",
                    }}
                  >
                    <img
                      src={three}
                      height="18px"
                      width="18px"
                      className="numberBox"
                    />
                    <p
                      style={{
                        float: "left",
                        width: "69%",
                        marginBottom: "2px",
                      }}
                    >
                      Wake up and enjoy your juice!
                    </p>
                    <img
                      height={45}
                      width={45}
                      src={tasty}
                      style={{ float: "left" }}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <div
                    className="item_text phone"
                    data-aos="fade-up"
                    data-aos-once="true"
                    data-aos-mirror="false"
                    style={{
                      marginTop: "10px",
                      marginBottom: "15px",
                      fontSize: "25px",
                      transitionDelay: "6s",
                      display: "inline-block",
                    }}
                    data-aos-duration="1500"
                  >
                    <Dropdown>
                      <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Available zipcodes for delivery
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className="pre-scrollable"
                        style={{
                          maxHeight: "160px",
                          minWidth: "100%",
                          textAlign: "center",
                        }}
                      >
                        {zipcodes.map((zip, index) => (
                          <Dropdown.Item key={index}>{zip}</Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>{" "}
      </section>
      <section className="three">
        <Container>
          <Row style={{ height: "80px" }}></Row>
          <Row className="justify-content-between">
            <Col
              xs="6"
              lg="5"
              style={{
                alignSelf: "end",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              <div
                data-aos="fade-right"
                data-aos-duration="1500"
                data-aos-delay="500"
                style={{ textAlign: "center", display: "flex" }}
                data-aos-once="true"
              >
                <img
                  src={juicer}
                  className="img-fluid shadow-4"
                  style={{ height: "120px", display: "inline-block" }}
                />
                <p
                  style={{
                    textAlign: "left",
                    alignSelf: "center",
                    fontWeight: "bold",
                    marginBottom: 0,
                    fontSize: "15px",
                    display: 'inline-block'
                  }}
                >
                  Using a high quality cold press juicer to extract the most
                   nutrients and flavors
                </p>
                <p></p>
              </div>
            </Col>
            <Col
              xs="6"
              lg="4"
              style={{
                alignSelf: "end",
                paddingLeft: "5px",
                paddingRight: "5px",
                textAlign: "center",
              }}
            >
              <div
                data-aos="fade-left"
                data-aos-duration="1500"
                data-aos-delay="2000"
                data-aos-once="true"
                style={{display: "flex"}}
              >
                <img
                  src={juice}
                  style={{ height: "125px", maxWidth: "93%", display: "inline-block" }}
                  className="img-fluid shadow-4"
                />
                <p
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "15px",
                    alignSelf: "center",
                    marginBottom: 0,
                    display: "inline-block"
                  }}
                >
                 Produce purchased and juice made the night before delivery for the most freshest made juice
                </p>
              </div>
            </Col> 
          </Row>
          <Row className="justify-content-center" style={{marginTop: '15px'}}>
            <Col xs="auto">
              <div
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay="1300"
                data-aos-once="true"
              >
                <img src={masked} style={{ maxWidth: "150px" }} />
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Juices made in a clean area
                </p>
                <p></p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </article>
    /*
    <div
      style={{
        height: "100vh",
        overflowX: "hidden",
        scrollSnapType: "y mandatory",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          scrollSnapAlign: "center",
          backgroundColor: "#fffced",
        }}
      >
          <div
            className="item_text"
            style={{ marginTop: "25px" }}
            data-aos="fade-up"
            data-aos-duration="2000"
            datatype-aos-delay="500"
          >
            <h3>Juice Houston</h3>
            <div className="item_des" style={{ textAlign: "center" }}>
              <p>Customize Fresh Juice deliver to you early in the morning</p>

              <Container fluid style={{ marginTop: "0px" }}>
                <Row>
                  <Col xs={12} sm={12} md={4}>
                    <div
                      className="item_text phone"
                      data-aos="fade-up"
                      style={{
                        marginTop: "10px",
                        fontSize: "25px",
                        display: "inline-block",
                      }}
                      data-aos-duration="2000"
                      data-aos-delay="2000"
                    >
                      <img
                        src={one}
                        height="18px"
                        width="18px"
                        style={{
                          float: "left",
                          marginTop: "12px",
                          marginRight: "5px",
                        }}
                      />
                      <p style={{ float: "left" }}>Create your juices</p>
                      <img
                        height={48}
                        width={48}
                        src={juices}
                        style={{ float: "right" }}
                      />
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4}>
                    <div
                      className="item_text"
                      data-aos="fade-up"
                      data-aos-duration="2000"
                      style={{
                        marginTop: "5px",
                        transitionDelay: "3.5s",
                        fontSize: "25px",
                        display: "inline-block",
                      }}
                    >
                      <img
                        src={two}
                        height="18px"
                        width="18px"
                        style={{ float: "left", marginTop: "10px" }}
                      />
                      <p>
                        Select the days you want your juices deliver in the
                        morning
                      </p>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4}>
                    <div
                      className="item_text"
                      data-aos="fade-up"
                      data-aos-duration="2000"
                      style={{
                        marginTop: "5px",
                        transitionDelay: "6s",
                        fontSize: "25px",
                        display: "inline-block",
                      }}
                    >
                      <img
                        src={three}
                        height="18px"
                        width="18px"
                        style={{
                          float: "left",
                          marginTop: "11px",
                          marginRight: "5px",
                        }}
                      />
                      <p style={{ float: "left", width: "69%" }}>
                        Wake up and enjoy your juice!
                      </p>
                      <img
                        height={45}
                        width={45}
                        src={tasty}
                        style={{ float: "left" }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <div
                      className="item_text phone"
                      data-aos="fade-up"
                      style={{
                        marginTop: "10px",
                        fontSize: "25px",
                        transitionDelay: "8s",
                        display: "inline-block",
                      }}
                      data-aos-duration="2000"
                    >
                      <Autocomplete
                        freeSolo
                        id="combo-box-demo"
                        options={zipcodes}
                        getOptionLabel={(option) => option.toString()}
                        style={{ width: 300, marginBottom: 0 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="normal"
                            label="Available zipcodes for delivery"
                            variant="outlined"
                          />
                        )}
                      />
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      {/*  <Item
        title="Home"
        desc="Custom made Fresh Juice delivered to your front door"
        backgroundImg={juice}
        leftBtnTxt=""
        leftBtnLink=""
        rightBtnTxt=""
        rightBtnLink=""
        twoButtons= 'true'
        first></Item> 
      <div
        style={{
          textAlign: 'center',
          scrollSnapAlign: 'center',
          flex: 'none',
          lineHeight: '256px',
          backgroundColor: "#fffced",
        }}
      >
        <div
          className="item"
          data-aos="fade-up"
          style={{
            marginTop: "5px",
            fontSize: "25px",
            display: "inline-block",
          }}
        >
        <img src={juicer} width="100" height="100"/> 
       </div>
      </div>
    </div>*/
  );
}

export default Home;
