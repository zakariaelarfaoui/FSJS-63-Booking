import React from "react";
import reactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";

reactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
