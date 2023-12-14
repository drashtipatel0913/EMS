import React from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "./react-bootstrap/Navbar.jsx";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const HomePage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Container className="mt-3">
        <h3 className="text-center">
          Welcome to the Employee Management System
        </h3>

        <Card className="my-3">
          <Card.Body>
            <Card.Title>Employee Operations</Card.Title>
            <Card.Text>
              Manage employees with features like creating, updating, viewing,
              and deleting employee records.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="my-3">
          <Card.Body>
            <Card.Title>Filters</Card.Title>
            <Card.Text>
              Utilize filters to narrow down your employee search:
              <div>
                <ul>
                  <li>Filter by Department</li>
                  <li>Filter by Title</li>
                  <li>Filter by Employee Type</li>
                  <li>Filter by Current Status</li>
                  <li>Filter by Upcoming Retirement</li>
                </ul>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Get Started</Card.Title>
            <Card.Text>
              To get started, click on the navigation links to access different
              features:
              <div>
                <ul>
                  <li>Create Employee - Add a new employee to the system.</li>
                  <li>
                    View Employees - Explore the list of existing employees.
                  </li>
                  <li>Update Employee - Modify employee information.</li>
                  <li>Delete Employee - Remove an employee from the system.</li>
                </ul>
              </div>
              Use the provided filters to customize your employee search.
            </Card.Text>
            <Button
              variant="outline-primary"
              as={NavLink}
              to="/create-employee"
              className="me-3 text-dark"
            >
              Create Employee
            </Button>
            <Button
              variant="outline-info"
              as={NavLink}
              to="/view-employee"
              className="text-dark"
            >
              View Employees
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default HomePage;
