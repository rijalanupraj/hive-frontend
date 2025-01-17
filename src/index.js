// External Import
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { SettingsProvider } from "./contexts/SettingsContext";

import "./main.scss";
// highlight
import "./utils/highlight";

// scroll bar
import "simplebar/src/simplebar.css";

// lightbox
import "react-image-lightbox/style.css";

// Editor
import "react-quill/dist/quill.snow.css";

// Internal Import
import store from "./redux/store";

const container = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </Provider>,
  container
);
