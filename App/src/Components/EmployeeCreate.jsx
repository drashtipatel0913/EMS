import React, { Component } from "react";
import { createEmployee } from "../Services/employeeService.js";
import Navbar from "./react-bootstrap/Navbar.jsx";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Button, Col, Row, Alert } from 'react-bootstrap';

export default class EmployeeCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorlist: [],
      message: "",
    };
  }

  createForm = async (formData) => {
    formData.preventDefault();
    this.setState({ message: "", errorlist: [] });

    const { firstName, lastName, dateOfJoining, department, title, employeeType, age } = formData.target;

    if (!firstName.value || !lastName.value || !dateOfJoining.value || !department.value || !title.value || !employeeType.value || !age.value) {
      this.setState({ errorlist: ["Please fill all the fields"] });
      return;
    }

    const ageValue = parseInt(age.value);

    if (ageValue < 18 || ageValue > 65) {
      this.setState({ errorlist: ["Age should be between 18 and 65"] });
      return;
    }

    const employeeData = {
      firstName: firstName.value,
      lastName: lastName.value,
      dateOfJoining: new Date(dateOfJoining.value).toISOString(),
      age: ageValue,
      department: department.value,
      title: title.value,
      employeeType: employeeType.value,
      currentStatus: true,
    };

    try {
      await createEmployee(employeeData);

      // reset values
      formData.target.reset();

      this.setState({ message: "Employee added to our system successfully" });
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  render() {
    const { errorlist, message } = this.state;

    return (
      <React.Fragment>
        <Navbar />
        <Container className="mt-5">
          <h5 className="pb-2">Employee Onboarding Form</h5>
          {errorlist.length > 0 && (
            <Alert variant="danger">
              {errorlist.map((error, index) => <p key={index}>{error}</p>)}
            </Alert>
          )}
          {message && (
            <Alert variant="success">
              {message}
            </Alert>
          )}
          <Form onSubmit={this.createForm} className="form bg-light p-5">
            <Row className="mb-3">
              <Col>
                <Form.Label htmlFor="firstname">First Name:</Form.Label>
                <Form.Control type="text" id="firstname" name="firstName" />
              </Col>
              <Col>
                <Form.Label htmlFor="lastName">Last Name:</Form.Label>
                <Form.Control type="text" id="lastName" name="lastName" />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <Form.Label htmlFor="age">Age:</Form.Label>
                <Form.Control type="number" id="age" name="age" />
              </Col>
              <Col>
                <Form.Label htmlFor="dateOfJoining">Date of Joining:</Form.Label>
                <Form.Control type="date" id="dateOfJoining" name="dateOfJoining" />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <Form.Label htmlFor="title">Title:</Form.Label>
                <Form.Select id="title" name="title">
                  <option value="Director">Director</option>
                  <option value="Employee">Employee</option>
                  <option value="VP">VP</option>
                  <option value="Manager">Manager</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Label htmlFor="department">Department:</Form.Label>
                <Form.Select id="department" name="department">
                  <option value="Engineering">Engineering</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-5">
              <Col>
                <Form.Label htmlFor="employeeType">Employee Type:</Form.Label>
                <Form.Select id="employeeType" name="employeeType">
                  <option value="FullTime">FullTime</option>
                  <option value="PartTime">PartTime</option>
                  <option value="Contract">Contract</option>
                  <option value="Seasonal">Seasonal</option>
                </Form.Select>
              </Col>
            </Row>
            <Button variant="outline-dark" type="submit" className="w-25">Create Employee</Button>
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}