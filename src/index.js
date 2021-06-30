import { StrictMode } from "react";
import ReactDOM from "react-dom";

import CountryCapital from "./App";

const rootElement = document.getElementById("root");

const data = {
  Germany: "Berlin",
  Japan: "Tokyo"
};
ReactDOM.render(
  <StrictMode>
    <CountryCapital data={data} />
  </StrictMode>,
  rootElement
);
