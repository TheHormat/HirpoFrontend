import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { legacy_createStore } from "redux";
import { Provider } from "react-redux";
import Reducer from "./store/Reducer";
const store = legacy_createStore(Reducer);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <App />
  </Provider>
);
