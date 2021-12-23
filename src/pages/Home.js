import React from "react";
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
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";
import juices from "../assets/Juices.png";
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
  const [value, setValue] = React.useState(null);
  const filter = createFilterOptions();

  AOS.init();

  const onScroll = (e) => {
    const zipCodeBar = e;
    console.log("e: ", e.target);
  };

  return (
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
        first></Item> */}
      <div
        className="item"
        style={{
          textAlign: 'center',
          scrollSnapAlign: 'center',
          flex: 'none',
          lineHeight: '256px',
          backgroundColor: "#fffced",
        }}
      >
        <Container>
          <Row>
            <Col>
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
          lmoaoo
        </div>
        </Col>
        </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
