// External Import
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";

// Internal Import
import store from "./redux/store";

const container = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);
