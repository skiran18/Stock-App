import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "../src/component/Login";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Categories from "../src/component/Categories";
import Stocks from "./component/Stocks";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/app" element={<App />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/stocks" element={<Stocks />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
