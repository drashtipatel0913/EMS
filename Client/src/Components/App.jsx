import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "../Pages/registerPage.jsx";
import LoginPage from "../Pages/loginPage.jsx";
import EmployeePage from "../Components/EmployeeDirectory.jsx"
import EmployeeTable from "./EmployeeTable.jsx";
import EmployeeCreate from "./EmployeeCreate.jsx";

export default class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/" element={<EmployeePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/view-employee" element={<EmployeeTable />} />
          <Route path="/create-employee" element={<EmployeeCreate />} />
        </Routes>
      </div>
    )
  }
}
