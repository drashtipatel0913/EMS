import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/homePage.jsx";
import RegisterPage from "./Pages/registerPage.jsx";
import LoginPage from "./Pages/loginPage.jsx";

export default class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    )
  }
}
