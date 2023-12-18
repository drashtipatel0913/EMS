import React, { Component } from "react";
import Navbar from "../Layouts/Navbar.jsx";
import { Link } from "react-router-dom";
import { Container, Table, Button, Alert } from "react-bootstrap";
import {
  getUpcomingRetirements,
  deleteEmployee,
  getEmployees
} from "../../Services/employeeServices.js";

export default class EmployeeRetirement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [], // Add an empty array for employees
      upcomingRetirements: [],
      message: "", // Initialize an empty message
    };
  }

  componentDidMount() {
    // Fetch both employees and upcoming retirements
    this.fetchEmployees();
    this.fetchUpcomingRetirements();
  }

  async fetchEmployees() {
    try {
      const employees = await getEmployees();
      this.setState({ employees });
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }

  async fetchUpcomingRetirements() {
    try {
      const upcomingRetirements = await getUpcomingRetirements();
      this.setState({ upcomingRetirements });
    } catch (error) {
      console.error("Error fetching upcoming retirements:", error);
    }
  }

  async doDelete(employeeId) {
    try {
      const employee = this.state.employees.find(
        (emp) => emp.id === employeeId
      );

      if (!employee) {
        // If the employee is not found, display an error message
        this.setState({
          message: "Employee not found",
        });
        return;
      }

      if (employee.currentStatus) {
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
          this.fetchUpcomingRetirements(); // Fetch updated retirements after deletion
        }
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  }

  render() {
    const rows = this.state.upcomingRetirements.map((employee) => {
      const dateOfJoining = new Date(employee.dateOfJoining);
      return (
        <tr key={employee.id}>
          <td>{employee.firstName}</td>
          <td>{employee.lastName}</td>
          <td>
            {dateOfJoining.toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "2-digit",
              timeZone: "UTC",
            })}
          </td>
          <td>{employee.age}</td>
          <td>{employee.title}</td>
          <td>{employee.employeeType}</td>
          <td>{employee.department}</td>
          <td>{employee.currentStatus ? "Working" : "Retired"}</td>
          <td>
            <Link
              className="btn btn-outline-info text-dark me-3"
              to={"/Details/" + employee.id}
            >
              Details
            </Link>
            <Link
              className="btn btn-primary me-3"
              to={"/Update/" + employee.id}
            >
              Update
            </Link>
            <Button variant="danger" onClick={() => this.doDelete(employee.id)}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <React.Fragment>
        <Navbar />
        <Container className="mt-5">
          <h5 className="pb-4">Upcoming Retirements</h5>

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
