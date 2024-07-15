import 'focus-visible';
import 'react-app-polyfill/ie9';
import React from "react";
import ReactDOM from "react-dom";
import { store } from './redux'
import { Provider } from "react-redux";
import App from "./App";
import GlobalStyles from './GlobalStyles';
import reportWebVitals from "./reportWebVitals";
import "./index.css";
// import configureStore from "./redux/configureStore";
// let initialState = {};
// const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <GlobalStyles />
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
