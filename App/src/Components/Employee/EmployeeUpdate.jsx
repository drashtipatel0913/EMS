import React, { Component } from "react";
import { useParams, Link } from "react-router-dom";
import { updateEmployee, fetchEmployeeData } from "../../Services/employeeServices.js";
import { Form, Button, Alert, Row, Col, Container } from "react-bootstrap";

function wrapper(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class EmployeeUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      message: "",
      id: null,
      firstName: "",
      lastName: "",
      dateOfJoining: "",
      age: "",
      title: "",
      employeeType: "",
      department: "",
      currentStatus:"",
    };
    this.updateForm = this.updateForm.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.params;

    fetchEmployeeData(id)
      .then((data) => {
        this.setState({ ...data });
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }

  updateForm(event) {
    console.log(event.target);
    event.preventDefault();
    this.setState({ msg: "" });
    let errors = [];

    if (!event.target.firstName.value) {
      errors.push("Firstname is required!");
    }
    if (!event.target.lastName.value) {
      errors.push("Lastname is required!");
    }
    if (!event.target.age.value) {
      errors.push("Age is required!");
    }
    if (
      parseInt(event.target.age.value) < 20 ||
      parseInt(event.target.age.value) > 70
    ) {
      errors.push("Age should be between 20 to 70");
    }
    if (!event.target.title.value) {
      errors.push("Title is required!");
    }
    if (!event.target.department.value) {
      errors.push("Department is required!");
    }
    if (!event.target.employeeType.value) {
      errors.push("Employee Type is required!");
    }
    if (!event.target.currentStatus.value) {
      errors.push("Current Status is required!");
    }

    this.setState({ errors: errors });

    if (errors.length === 0) {
      let ageNum = parseInt(event.target.age.value);
      const data = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        age: ageNum,
        title: event.target.title.value,
        department: event.target.department.value,
        employeeType: event.target.employeeType.value,
        currentStatus: event.target.currentStatus.value,
      };
      event.target.firstName.value = "";
      event.target.lastName.value = "";
      event.target.age.value = "";
      event.target.title.value = "";
      event.target.department.value = "";
      event.target.employeeType.value = "";
      event.target.currentStatus.value = "";

      updateEmployee(data);
      this.setState({ message: "Employee Updated Successfully" });
    }
  }

  onChange(event) {
    const inputData = event.target.value;
    this.setState({
      [event.target.name]: inputData,
    });
  }

  updateEmployee(inputData) {
    inputData.currentStatus = this.state.currentStatus === "1" ? true : false;
    updateEmployee(this.state.id, inputData)
      .then((data) => {
        this.setState({ message: "Employee updated successfully" });
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          dateOfJoining: data.dateOfJoining,
          title: data.title,
          department: data.department,
          employeeType: data.employeeType,
          currentStatus: data.currentStatus,
          id: data.id,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    const errorlist = this.state.errors.map((error, index) => (
      <Alert key={index} variant="danger">
        {error}
      </Alert>
    ));

    return (
      <React.Fragment>
        <Container className="mt-5">
          {errorlist}
          <Form onSubmit={this.updateForm} className="form py-3">
            <h5 className="pb-2">Employee Information Update Form</h5>
            <Row className="py-1">
              <Col>
                {this.state.message && (
                  <Alert variant="success" role="alert">
                    {this.state.message}
                  </Alert>
                )}
              </Col>
            </Row>
            <Row className="py-1">
              <Col md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    defaultValue={this.state.firstName}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formDateOfJoining">
                  <Form.Label>Date of joining:</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfJoining"
                    className="form-control"
                    defaultValue={this.state.dateOfJoining}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="py-1">
              <Col md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    defaultValue={this.state.lastName}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formDepartment">
                  <Form.Label>Department:</Form.Label>
                  <Form.Control
                    as="select"
                    name="department"
                    className="form-select"
                    value={this.state.department}
                    onChange={this.onChange}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="py-1">
              <Col md={6}>
                <Form.Group controlId="formAge">
                  <Form.Label>Age:</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    className="form-control"
                    defaultValue={this.state.age}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formTitle">
                  <Form.Label>Title:</Form.Label>
                  <Form.Control
                    as="select"
                    name="title"
                    className="form-select"
                    value={this.state.title}
                    onChange={this.onChange}
                  >
                    <option value="Director">Director</option>
                    <option value="Employee">Employee</option>
                    <option value="VP">VP</option>
                    <option value="Manager">Manager</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="py-1">
              <Col md={6}>
                <Form.Group controlId="formEmployeeType">
                  <Form.Label>Employee of Type:</Form.Label>
                  <Form.Control
                    as="select"
                    name="employeeType"
                    className="form-select"
                    value={this.state.employeeType}
                    disabled
                  >
                    <option value="FullTime">FullTime</option>
                    <option value="PartTime">PartTime</option>
                    <option value="Contract">Contract</option>
                    <option value="Seasonal">Seasonal</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formCurrentStatus">
                  <Form.Label>Current Status:</Form.Label>
                  <Form.Control
                    as="select"
                    name="currentStatus"
                    className="form-select"
                    value={this.state.currentStatus}
                    onChange={this.onChange}
                  >
                    <option value={true}>Working</option>
                    <option value={false}>Retired</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="py-1">
              <Col>
                <Button
                  variant="outline-dark"
                  className="my-5 w-25"
                  type="submit"
                >
                  Update Employee
                </Button>
              </Col>
            </Row>
            <Link
              to="/view-employee"
              className="ms-3 my-2 w-25 fw-bold text-decoration-none text-dark"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Go Back
            </Link>
          </Form>
        </Container>
      </React.Fragment>
    );
  }
}

export default wrapper(EmployeeUpdate);
