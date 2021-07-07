import React from "react";
import porch from "../assets/porch.png";
import juice from "../assets/juice.jpg";
import Item from "../components/Item";
import AOS from "aos";
import "../components/Item.css";
import { TextField } from "@material-ui/core";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";

const zipcodes = [
  77040, 77088, 77037, 77039, 77050, 77080, 77092, 77091, 77076, 77093, 77016,
  77055, 77018, 77022, 77026, 77028, 77024, 77008, 77009, 77020, 77063, 77057,
  77027, 77007, 77019, 77201, 77003, 77011, 77098, 77401, 77004, 77023, 77021,
  77030, 77401, 77087, 77012, 77054, 77096, 77042, 77036,
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
          <div className="item_text" data-aos="fade-in">
            <p>Home</p>
            <div className="item_des">
              <p>Customize Fresh Juice deliever early in the morning</p>
              <Autocomplete
              freeSolo
            id="combo-box-demo"
            options={zipcodes}
            getOptionLabel={(option) => option.toString()}
            style={{ width: 300, }}
            renderInput={(params) => (
              <TextField {...params}  margin="normal" label="Avialable location for delivery" variant="outlined" 
              />
            )}
          />
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
