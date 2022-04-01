import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./redux/store";
import "./css/App.css"
require('dotenv').config() 
render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
