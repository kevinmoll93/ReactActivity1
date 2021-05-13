import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import MenuProvider from "react-flexible-sliding-menu";
import './assets/css/index.css';
import App from './App';
import Menu from "./views/Menu";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <MenuProvider MenuComponent={Menu} animation="push">
      <App />
    </MenuProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
