import React, { Component } from "react";
import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeTable from "./EmployeeTable.jsx";
import EmployeeCreate from "./EmployeeCreate.jsx";
import EmployeeFilter from "./EmployeeFilter.jsx";
import Navbar from "./react-bootstrap/Navbar.jsx";

import {
  filterByTitle,
  filterByDepartment,
  filterByEmployeeType,
  filterByCurrentStatus,
} from "../Services/FilterService.js";

const UI_API_ENDPOINT = process.env.UI_API_ENDPOINT;

export default class EmployeeDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
    this.createEmployee = this.createEmployee.bind(this);
    this.getemployees = this.getemployees.bind(this);
  }

  getemployees() {
    fetch(UI_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
               query GetEmployees {
                  getEmployees {
                     id
                     firstName
                     lastName
                     age
                     dateOfJoining
                     title
                     department
                     employeeType
                     currentStatus
                  }
               }
           `,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ employees: data.data.getEmployees });
      })
      .catch((error) => {
        console.error("GraphQL error:", error);
      });
  }

  componentDidMount() {
    this.getemployees();
  }

  createEmployee(inputdata) {
    fetch(UI_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation CreateEmployee($employeeInput: employeeInput) {
                  createEmployee(employeeInput: $employeeInput) {
                    id
                    firstName
                    lastName
                    age
                    dateOfJoining
                    title
                    department
                    employeeType
                    currentStatus
                  }
                }`,
        variables: { employeeInput: inputdata },
      }),
    })
      .then((res) => res.json())
      .then(function (res) {
        console.log(res);
      })
      .catch((error) => {
        console.error("GraphQL error:", error);
      });
    this.getemployees();
  }

  handleFilterByTitle = (title) => {
    filterByTitle(title, this.getemployees, this.setState.bind(this));
  };

  handleFilterByDepartment = (department) => {
    filterByDepartment(department, this.getemployees, this.setState.bind(this));
  };

  handleFilterByEmployeeType = (employeeType) => {
    filterByEmployeeType(
      employeeType,
      this.getemployees,
      this.setState.bind(this)
    );
  };

  handleFilterByStatus = (status) => {
    filterByCurrentStatus(status, this.getemployees, this.setState.bind(this));
  };

  render() {
    const departments = ["IT", "Marketing", "HR", "Engineering"];
    const titles = ["Director", "Employee", "VP", "Manager"];
    const employeeTypes = ["FullTime", "PartTime", "Contract", "Seasonal"];

    return (
      <React.Fragment>
        <Navbar />
        <h1 className="text-center m-3">Employee Management System</h1>
        <EmployeeSearch />
        <EmployeeFilter
          departments={departments}
          titles={titles}
          employeeTypes={employeeTypes}
          filterByTitle={this.handleFilterByTitle}
          filterByDepartment={this.handleFilterByDepartment}
          filterByEmployeeType={this.handleFilterByEmployeeType}
          filterByStatus={this.handleFilterByStatus}
        />
        <EmployeeTable
          employees={this.state.employees}
          getemployees={this.getemployees}
        />
        <EmployeeCreate createEmployee={this.createEmployee} />
      </React.Fragment>
    );
  }
}
