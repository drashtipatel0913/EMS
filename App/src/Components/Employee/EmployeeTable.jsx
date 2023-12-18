import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Table, Alert } from "react-bootstrap";
import EmployeeFilter from "./EmployeeFilter.jsx";
import Navbar from "../Layouts/Navbar.jsx";
import {
  getEmployees,
  deleteEmployee,
  isEmployeeActive,
} from "../../Services/employeeServices.js";
import {
  filterByTitle,
  filterByDepartment,
  filterByEmployeeType,
  filterByCurrentStatus,
  filterByUpcoming,
} from "../../Services/FilterServices.js"

export default class EmployeeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
  }

  handleFilterByTitle = (title) => {
    filterByTitle(title, this.fetchEmployees, this.setState.bind(this));
  };

  handleFilterByDepartment = (department) => {
    filterByDepartment(
      department,
      this.fetchEmployees,
      this.setState.bind(this)
    );
  };

  handleFilterByEmployeeType = (employeeType) => {
    filterByEmployeeType(
      employeeType,
      this.fetchEmployees,
      this.setState.bind(this)
    );
  };

  handleFilterByStatus = (status) => {
    filterByCurrentStatus(
      status,
      this.fetchEmployees,
      this.setState.bind(this)
    );
  };

  handleFilterByUpcoming = (upcoming) => {
    filterByUpcoming(
    upcoming,
    this.fetchEmployees,
    this.setState.bind(this));
  };

  componentDidMount() {
    this.fetchEmployees();
  }

  async fetchEmployees() {
    try {
      const employees = await getEmployees();
      this.setState({ employees });
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }

  async doDelete(employeeId) {
    try {
      const employee = this.state.employees.find(
        (emp) => emp.id === employeeId
      );

      if (isEmployeeActive(employee)) {
        // If the employee is active, display an error message
        this.setState({
          message: "CAN'T DELETE EMPLOYEE - STATUS ACTIVE",
        });
      } else {
        // Display a confirmation dialog
        const confirmDelete = window.confirm(
          `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`
        );
        if (confirmDelete) {
          await deleteEmployee(employeeId);
          this.setState({
            message: "Employee Data Deleted Successfully!",
          });
          this.fetchEmployees();
        }
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  }

  render() {
    const departments = ["IT", "Marketing", "HR", "Engineering"];
    const titles = ["Director", "Employee", "VP", "Manager"];
    const employeeTypes = ["FullTime", "PartTime", "Contract", "Seasonal"];

    const rows = this.state.employees.map((row) => {
      const dateOfJoining = new Date(row.dateOfJoining);
      return (
        <tr key={row.id}>
          <td>{row.firstName}</td>
          <td>{row.lastName}</td>
          <td>
            {dateOfJoining.toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
              timeZone: "UTC",
            })}
          </td>
          <td>{row.age}</td>
          <td>{row.title}</td>
          <td>{row.employeeType}</td>
          <td>{row.department}</td>
          <td>{row.currentStatus ? "Working" : "Retired"}</td>
          <td>
            <Link
              className="btn btn-outline-info text-dark me-3"
              to={"/Details/" + row.id}
            >
              Details
            </Link>
            <Link className="btn btn-primary me-3" to={"/Update/" + row.id}>
              Update
            </Link>
            <Button variant="danger" onClick={() => this.doDelete(row.id)}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <React.Fragment>
        <Navbar />
        <Container className="mt-3">
          <EmployeeFilter
            departments={departments}
            titles={titles}
            employeeTypes={employeeTypes}
            filterByTitle={this.handleFilterByTitle}
            filterByDepartment={this.handleFilterByDepartment}
            filterByEmployeeType={this.handleFilterByEmployeeType}
            filterByStatus={this.handleFilterByStatus}
            filterByUpcoming={this.handleFilterByUpcoming}
          />
          {this.state.message && (
            <Alert variant="danger" className="mt-3">
              {this.state.message}
            </Alert>
          )}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Date of joining</th>
                <th>Age</th>
                <th>Title</th>
                <th>Employee type</th>
                <th>Department</th>
                <th>Current status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}
