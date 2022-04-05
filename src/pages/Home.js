import React, { useEffect } from "react";
import one from "../assets/one.png";
import two from "../assets/two.png";
import three from "../assets/three.png";
import AOS from "aos";
import "aos/dist/aos.css";
import "../css/Item.css";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import "../css/Home.css";
import juices from "../assets/Juices.png";
import masked from "../assets/masked.png";
import tasty from "../assets/tasty.png";
import juicer from "../assets/juicer.png";
import juice from "../assets/juice.png";
const zipcodes = [
  77003, 77004, 77007, 77008, 77009, 77011, 77012, 77016, 77018, 77019, 77020,
  77021, 77022, 77023, 77024, 77026, 77027, 77028, 77030, 77036, 77037, 77039,
  77040, 77042, 77050, 77054, 77055, 77057, 77063, 77076, 77080, 77087, 77088,
  77091, 77092, 77093, 77096, 77098, 77201, 77401,
];


function Home() {
  useEffect(() => {
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

        //#e0c3fc 0%, #8ec5fc
        background: "linear-gradient(180deg, #8ec5fc -10%, #7c73ff 90%)"
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
                <Col xs={12} sm={12} md={4} style={{paddingLeft: 0, paddingRight: 0}}>
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
                      style={{ float: "right", marginTop: "7px" }}
                    />
                  </div>
                </Col>
                <Col xs={12} sm={12} md={4} style={{paddingLeft: '4px', paddingRight: '4px'}}>
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
                <Col xs={12} sm={12} md={4} style={{paddingLeft: 0, paddingRight: 0}}>
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
                      style={{ float: "left", marginTop:'15px' }}
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
                      <Dropdown.Toggle style={{backgroundColor: "#A6EB6C", opacity: ".90", borderColor: "#7CBEEB"}} id="dropdown-basic">
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
        </div>
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
  );
}

export default Home;
