import React from "react";
import porch from "../assets/porch.png";
import juice from "../assets/juice.jpg";
import Item from "../components/Item";
import AOS from "aos";
import "../components/Item.css";
import { TextField } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";
const zipcodes = [
  77003, 77004, 77007, 77008, 77009, 77011, 77012, 77016, 77018, 77019, 77020, 77021, 77022, 
  77023, 77024, 77026, 77027, 77028, 77030, 77036, 77037, 77039, 77040, 77042, 77050, 77054,
  77055, 77057, 77063, 77076, 77080, 77087, 77088, 77091, 77092, 77093, 77096, 77098,
  77201, 77401,
];

function Home() {
  const [value, setValue] = React.useState(null);
  const filter = createFilterOptions();

  AOS.init();
  return (
    <div
      style={{
        height: "100vh",
        scrollSnapType: "y mandatory",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          scrollSnapAlign: "start",
          backgroundImage: `url(${juice})`,
        }}
      >
        <div className="item_container">
          <div
            className="item_text"
            style={{marginTop: '55px'}}
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <h3>Juice Houston</h3>
            <div className="item_des">
              <p>Customize Fresh Juice deliever early in the morning</p>
              <Autocomplete
                freeSolo
                id="combo-box-demo"
                options={zipcodes}
                getOptionLabel={(option) => option.toString()}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    label="Available location for delivery"
                    variant="outlined"
                  />
                )}
              />
              <br />
              <br />
            </div>
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
      <Item
        title="Next"
        desc="yooooo"
        backgroundImg={porch}
        leftBtnTxt=""
        leftBtnLink=""
        rightBtnTxt=""
        rightBtnLink=""
        twoButtons="true"
      />
    </div>
  );
}

export default Home;
