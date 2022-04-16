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
    //#e0c3fc 0%, #8ec5fc
    //background: "linear-gradient(180deg, #8ec5fc -10%, #7c73ff 90%)"
    <Container fluid style={{background: "linear-gradient(180deg, #8ec5fc -10%, #7c73ff 90%)",
    overflowX: 'hidden'}}>
      <div style={{height: "78vh", minHeight: "550px"}}>
      <Row className="justify-content-center">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          style={{ paddingTop: "19px", textAlign: "center" }}
        >
          <h3 className="juiceHoustonTitle" >Juice Houston</h3>
          </div>
          </Row>
          <Row className="justify-content-center">     
               <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="900"
          style={{ textAlign: "center" }}
        >
          <p className="subtitle"> Customized Fresh Juice deliver to you early in the morning</p>
        </div>
      </Row>
      <Row className="justify-content-center" style={{ marginTop: "0px" }}>
        <Col xs={9} sm={8} md={4} lg={3} style={{textAlign: "center", paddingLeft: 0, paddingRight: 0 }}>
          <div
            className="item_text phone"
            data-aos="fade-up"
            style={{
              marginTop: "10px",
              fontSize: "25px",
              display: "inline-block",
              textAlign: "center"
            }}
            data-aos-duration="1500"
            data-aos-delay="2000"
            data-aos-once="true"
            data-aos-mirror="false"
          >
            <img className="numberBox" src={one} height="18px" width="18px" alt="number box" />
            <p className="step1" style={{ float: "left", marginBottom: "2px" }} alt="step1">
              Create your juices
            </p>
            <img
              height={48}
              width={48}
              src={juices}
              alt="juices"
              style={{ float: "right", marginTop: "2px" }}
            />
          </div>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={4}
          lg={5}
          style={{textAlign: "center", paddingLeft: "4px", paddingRight: "4px" }}
        >
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
            <img src={two} height="18px" width="18px" className="numberBox"  alt="step2" />
            <p className="step2" style={{ marginBottom: "2px" }}>
              Select the days you want your juices delivered in the morning
            </p>
          </div>
        </Col>
        <Col xs={10} sm={12} md={4} style={{textAlign: "center"}}>
          <div
            className="item_text"
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-once="true"
            data-aos-mirror="false"
            style={{
              marginTop: "5px",
              transitionDelay: "4.2s",
              fontSize: "25px",
              display: "inline-block",
            }}
          >
            <img src={three} height="18px" width="18px" className="numberBox"  alt="step3"/>
            <p  className="step1" 
              style={{
                textAlign: "center",
                float: "left",
                width: "76%",
                marginBottom: "2px",
              }}
            >
              Wake up and enjoy your juice! 
              <img alt="smiley face"
              height={45}
              width={45}
              src={tasty}
            />
            </p>
           
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center"> 
        <Col md='auto' style={{textAlign: "center"}}>
          <div
            className="item_text phone"
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-mirror="false"
            style={{
              marginTop: "10px",
              marginBottom: "15px",
              fontSize: "25px",
              transitionDelay: "5.2s",
              display: "inline-block",
            }}
            data-aos-duration="1300"
          >
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "#A6EB6C",
                  opacity: ".90",
                  borderColor: "#7CBEEB",
                }}
                id="dropdown-basic"
              >
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
      </div>
      <Row>
        <Col
          xs={11}
          sm={8}
          lg={10} className="juicerCol"
        >
          <div
            data-aos="fade-right"
            data-aos-duration="1500"
            style={{ textAlign: "center", display: "flex"
          }}
            data-aos-once="true"
          >
            <img  alt="juicer"
              src={juicer} className="juicerImg"
              style={{ display: "inline-block" }}
            />
            <p className="juicerText"
            >
              High quality cold press juicer
            </p>
          </div>
        </Col>
        </Row>
        <Row className="justify-content-end" style={{marginTop: "-15px"}}>
        <Col
          xs={10}
          sm={10} className="juiceCol"
        >
          <div
            data-aos="fade-left"
            data-aos-duration="1500"
            data-aos-once="true"
            style={{ display: "flex",
          }}
          >
            <p className="juiceText"
            >
              Made the night before delivery for the
              most freshest juice
            </p>
            <img  alt="juice"
              src={juice}
              className="juiceImg"
            />
          </div>
        </Col>
        </Row>
        <Row  style={{paddingBottom: "80px", marginTop: '-15px'}}>
        <Col xs={12} sm={11} className="smileyCol">
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-once="true"
          >
            <img src={masked}  alt="masked emoji" className="smileyImg" />
            <p className="smileyText"
            >
              Juices are made in a clean environment
            </p>
            <p></p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>        
        <p style={{textAlign: "center", fontSize: "9px"}}>Questions? email me at juicedhouston@gmail.com </p>
</Col>
      </Row>
    </Container>
  );
}

export default Home;
