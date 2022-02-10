import React, { useEffect } from "react";
import porch from "../assets/porch.png";
import juice from "../assets/juice.jpg";
import one from "../assets/one.png";
import two from "../assets/two.png";
import three from "../assets/three.png";
import Item from "../components/Item";
import AOS from "aos";
import "../components/Item.css";
import { TextField } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { Container, Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import "./Home.css";
import juices from "../assets/Juices.png";
import masked from "../assets/masked.png";
import tasty from "../assets/tasty.png";
import juicer from "../assets/juicer.png";
import tesla from "../assets/tesla.png";
const zipcodes = [
  77003, 77004, 77007, 77008, 77009, 77011, 77012, 77016, 77018, 77019, 77020,
  77021, 77022, 77023, 77024, 77026, 77027, 77028, 77030, 77036, 77037, 77039,
  77040, 77042, 77050, 77054, 77055, 77057, 77063, 77076, 77080, 77087, 77088,
  77091, 77092, 77093, 77096, 77098, 77201, 77401,
];

function Home() {
  useEffect(() => {
    // Update the document title using the browser API
    window.scrollTo(0, 0);
    console.log(localStorage);
  });

  AOS.init();
  return (
    <div
      style={{
        scrollSnapType: "y mandatory",
      }}
    >
      <section class="one">
        <div
          data-aos="fade-up"
          data-aos-duration="1200"
          style={{ paddingTop: "12px", textAlign: "center" }}
        >
          <h3 style={{ }}>Juice Houston</h3>
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
                      style={{ float: "left", marginTop: "10px" }}
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
                      style={{
                        float: "left",
                        marginTop: "11px",
                        marginRight: "5px",
                      }}
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
                    style={{
                      marginTop: "10px",
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
                        style={{ maxHeight: "160px", minWidth: "100%", textAlign: "center" }}
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
      <section class="three">
        <Container>
          <Row style={{ height: "80px" }}></Row>
          <Row className="justify-content-center">
            <Col
              xs="6"
              lg="4"
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
                style={{ textAlign: "center" }}
              >
                <img
                  src={juicer}
                  className="img-fluid shadow-4"
                  style={{ height: "150px" }}
                />
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: 0,
                    fontSize: "15px",
                  }}
                >
                  High Quality Cold Press Juicer
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
                textAlign: "center"
              }}
            >
              <div
                data-aos="fade-left"
                data-aos-duration="1500"
                data-aos-delay="2000"
              >
                <img
                  src={tesla}
                  style={{ height: "150px", maxWidth: "95%" }}
                  className="img-fluid shadow-4"
                />
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                    marginBottom: 0,
                  }}
                >
                  Near Zero Carbon Emissions
                </p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="auto">
              <div
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay="1300"
              >
                <img src={masked} style={{ maxWidth: "170px" }} />
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Health is the priority
                </p>
                <p></p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
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
